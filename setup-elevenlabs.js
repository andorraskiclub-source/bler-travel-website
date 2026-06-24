/**
 * One-time setup: creates a single, concise ElevenLabs Conversational AI agent
 * for the BLER Travel Brazil website voice widget. Capped at 60s per call.
 * Run once: node setup-elevenlabs.js
 */
const fs = require("fs");
const path = require("path");

const ENV_PATH = path.join(__dirname, ".env");
const env = Object.fromEntries(
  fs.readFileSync(ENV_PATH, "utf-8")
    .split("\n")
    .filter((l) => l.includes("="))
    .map((l) => {
      const i = l.indexOf("=");
      return [l.slice(0, i).trim(), l.slice(i + 1).trim()];
    })
);

const KEY = env.ELEVENLABS_API_KEY;
if (!KEY) {
  console.error("❌ ELEVENLABS_API_KEY not found in .env");
  process.exit(1);
}

const BASE = "https://api.elevenlabs.io/v1";

async function api(method, urlPath, body) {
  const opts = { method, headers: { "xi-api-key": KEY, "Content-Type": "application/json" } };
  if (body) opts.body = JSON.stringify(body);
  const r = await fetch(`${BASE}${urlPath}`, opts);
  const text = await r.text();
  let parsed;
  try { parsed = JSON.parse(text); } catch { parsed = text; }
  if (!r.ok) {
    console.error(`❌ ${method} ${urlPath} → ${r.status}`);
    console.error(parsed);
  }
  return parsed;
}

// TODO: replace with the real "Karina Main Voice Clone" voice_id once available
// (grab it from https://elevenlabs.io/app/voice-lab, or enable the voices_read
// permission on the API key so this script can look it up automatically).
const VOICE_ID = env.ELEVENLABS_VOICE_ID || "EXAVITQu4vr4xnSDxMaL"; // fallback: Sarah

const SYSTEM_PROMPT = `
Você é a Karina, atendente de voz da BLER Travel Brazil — agência de viagens de luxo com
mais de 20 anos de experiência, escritórios no Rio de Janeiro e em Boston (EUA).

## OBJETIVO DA CHAMADA (curta e direta — limite de 2 minutos)
Esta ligação é breve por design. Siga exatamente esta sequência, sem rodeios:
1. Cumprimente o cliente pelo nome em 1 frase curta.
2. Pergunte diretamente o que ele está buscando (destino, e se é viagem de lazer ou
   corporativa). Uma pergunta por vez.
3. Se o cliente NÃO mencionar a data de início da viagem espontaneamente, pergunte
   diretamente por ela (ex: "Qual a data prevista para o início da viagem?"). Esse dado é
   obrigatório — nunca encerre a chamada sem ter a data de início, mesmo que aproximada
   (mês/ano já é suficiente).
4. Se o cliente NÃO mencionar a duração da viagem espontaneamente, pergunte diretamente por
   ela (ex: "Quantos dias vai durar a viagem?"). Esse dado também é obrigatório — nunca
   encerre a chamada sem saber por quantos dias o cliente vai viajar.
5. Pergunte quantas pessoas vão viajar e se há crianças (e, se houver, as idades) — isso
   afeta diretamente as tarifas e é essencial para a proposta.
6. Ouça as respostas. Confirme em UMA frase curta que entendeu a necessidade.
7. Encerre a ligação: agradeça, diga que a equipe BLER vai preparar uma proposta e retornar
   por WhatsApp ou email com os dados informados, termine com uma despedida clara e audível
   (ex: "Muito obrigada, até breve!" ou "Obrigada, tenha um ótimo dia!"), e na MESMA resposta
   chame a ferramenta end_call. A despedida e a chamada da ferramenta end_call acontecem
   juntas, na mesma resposta — nunca apenas diga adeus e espere.
8. Se o cliente disser "obrigado", "tchau", ou indicar que terminou antes de você, na MESMA
   resposta diga uma despedida curta (ex: "Eu que agradeço, até breve!") E chame a ferramenta
   end_call — nunca deixe o cliente falando sem resposta, e nunca responda sem encerrar.

## REGRA MAIS IMPORTANTE — ENCERRAMENTO OBRIGATÓRIO
Você é OBRIGADA a chamar a ferramenta end_call sempre que disser uma despedida (tchau,
até breve, obrigada, tenha um bom dia, etc). Despedida sem chamar end_call é um ERRO GRAVE —
a chamada continua aberta e gera custo desnecessário. NUNCA diga uma frase de despedida sem,
na mesma resposta, chamar end_call.

## REGRAS
- Detecte o idioma do cliente (português, inglês ou espanhol) e responda no mesmo idioma.
- NUNCA faça small talk, não repita informações, não leia listas longas.
- Cada fala sua deve ter no máximo 1-2 frases curtas. Seja objetiva sempre.
- O cliente já informou os dados antes da chamada: Nome: {{name}}, WhatsApp: {{whatsapp}},
  Email: {{email}}. Use o nome dele uma vez, de forma natural.
- Seu papel NÃO é resolver tudo na ligação — é captar destino, DATA DE INÍCIO DA VIAGEM,
  DURAÇÃO DA VIAGEM (em dias), número de viajantes e presença de crianças rapidamente, e
  garantir o retorno da equipe. Priorize terminar a chamada com cortesia assim que tiver
  essas informações.
- A data de início da viagem é OBRIGATÓRIA. Se o cliente não mencionar, você deve perguntar
  antes de encerrar a chamada — mesmo que seja apenas mês e ano.
- A duração da viagem (quantos dias) é OBRIGATÓRIA. Se o cliente não mencionar, você deve
  perguntar antes de encerrar a chamada.
- Se o assunto não for sobre viagens, redirecione com cortesia em uma frase e volte ao tema.
- NUNCA termine a chamada sem antes falar uma despedida em voz alta E chamar end_call.
`.trim();

const END_CALL_TOOL = {
  type: "system",
  name: "end_call",
  description: "Chame esta ferramenta NA MESMA resposta em que você disser a despedida ao cliente (tchau, até breve, obrigada). Despedida e end_call sempre juntos, nunca separados.",
  force_pre_tool_speech: true,
};

const FIRST_MESSAGE = "Olá, {{name}}! Sou a Karina, da BLER Travel Brazil. Para onde você está pensando em viajar?";

const CLOSING_MESSAGE = "Nosso tempo está chegando ao fim — já tenho o que preciso. Nossa equipe vai te retornar por WhatsApp ou email em breve. Obrigada!";

const KNOWLEDGE_BASE_TEXT = `
BLER TRAVEL BRAZIL — Informações da Empresa

Fundada em 2004, a BLER Travel Brazil tem mais de 20 anos de experiência no mercado de
viagens de luxo.

Site oficial: https://www.blertravelbrazil.net/

A BLER opera principalmente como um serviço online — atendimento remoto e personalizado,
sem depender de visitas presenciais a uma agência física.

Serviços oferecidos:
- Assistência Corporativa: gestão de viagens executivas para empresas.
- Viagens de Lazer: roteiros personalizados de alto padrão (Maldivas, Europa, EUA, lua de
  mel, viagens em família, etc).
- Back Office Agency Support: suporte de emissão, fechamento e operações para outras
  agências de viagem parceiras.

A BLER conta com uma parceria nos Estados Unidos, o que garante acesso a tarifas mais
competitivas e suporte logístico diferenciado para clientes que viajam internacionalmente.

Contato: blertravel@ymail.com / blertravelbrazil@yahoo.com
`.trim();

function buildConversationConfig(kbDocId) {
  return {
    agent: {
      prompt: {
        prompt: SYSTEM_PROMPT,
        llm: "claude-sonnet-4",
        temperature: 0.4,
        max_tokens: 180,
        tools: [END_CALL_TOOL],
        knowledge_base: [
          { type: "text", name: "BLER Travel Brazil — Company Info", id: kbDocId, usage_mode: "auto" },
        ],
      },
      first_message: FIRST_MESSAGE,
      language: "pt",
      dynamic_variables: {
        dynamic_variable_placeholders: { name: "Cliente", whatsapp: "", email: "" },
      },
    },
    turn: { turn_timeout: 5, mode: "turn" },
    tts: {
      model_id: "eleven_turbo_v2_5",
      voice_id: VOICE_ID,
      optimize_streaming_latency: 3,
    },
    conversation: {
      max_duration_seconds: 120,
      max_conversation_duration_message: CLOSING_MESSAGE,
    },
  };
}

async function ensureKnowledgeBaseDoc() {
  if (env.ELEVENLABS_KB_DOC_ID) return env.ELEVENLABS_KB_DOC_ID;

  const doc = await api("POST", "/convai/knowledge-base/text", {
    name: "BLER Travel Brazil — Company Info",
    text: KNOWLEDGE_BASE_TEXT,
  });
  if (!doc.id) {
    console.error("❌ Failed to create knowledge base document");
    process.exit(1);
  }
  console.log(`✅ Knowledge base document created: ${doc.id}`);

  let envContent = fs.readFileSync(ENV_PATH, "utf-8");
  envContent += `\nELEVENLABS_KB_DOC_ID=${doc.id}`;
  fs.writeFileSync(ENV_PATH, envContent.trim() + "\n");

  return doc.id;
}

async function main() {
  const existingId = env.ELEVENLABS_SOFIA_AGENT_ID;
  const kbDocId = await ensureKnowledgeBaseDoc();
  const conversationConfig = buildConversationConfig(kbDocId);

  if (existingId) {
    console.log(`🔧 Updating existing BLER Travel agent (${existingId})...\n`);
    const updated = await api("PATCH", `/convai/agents/${existingId}`, { name: "BLER Travel — Karina", conversation_config: conversationConfig });
    if (!updated.agent_id) {
      console.error("❌ Failed to update agent");
      process.exit(1);
    }
    console.log(`✅ Agent updated: ${updated.agent_id} (voice ${VOICE_ID}, max 120s, end_call tool on, knowledge base attached)`);
    return;
  }

  console.log("🔧 Creating BLER Travel ElevenLabs agent (single voice, 60s cap)...\n");
  const agent = await api("POST", "/convai/agents/create", {
    name: "BLER Travel — Karina",
    conversation_config: conversationConfig,
  });

  if (!agent.agent_id) {
    console.error("❌ Failed to create agent");
    process.exit(1);
  }

  console.log(`✅ Agent created: ${agent.agent_id} (voice ${VOICE_ID}, max 120s, knowledge base attached)`);

  let envContent = fs.readFileSync(ENV_PATH, "utf-8");
  const lineKey = "ELEVENLABS_SOFIA_AGENT_ID";
  envContent += `\n${lineKey}=${agent.agent_id}`;
  fs.writeFileSync(ENV_PATH, envContent.trim() + "\n");

  console.log("\n🎉 Done! Agent ID saved to .env as ELEVENLABS_SOFIA_AGENT_ID");
  console.log("   View it at: https://elevenlabs.io/app/conversational-ai");
}

main().catch((e) => { console.error(e); process.exit(1); });
