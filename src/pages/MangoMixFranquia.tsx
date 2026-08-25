import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Instagram,
  MapPin,
  Sparkles,
  Flame,
  TrendingUp,
  Users,
  Store,
  Truck,
  Building2,
  CheckCircle2,
  Quote,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

import logo from "@/assets/mangomix-logo.png";
import heroImg from "@/assets/mango-hero.jpg";
import kioskImg from "@/assets/mango-kiosk.jpg";
import flatlayImg from "@/assets/mango-flatlay.jpg";
import founderImg from "@/assets/mango-founder.jpg";

const IG_PROFILE = "https://www.instagram.com/mangomixoficial/";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

function Section({
  id,
  className = "",
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={`px-5 py-20 md:py-28 ${className}`}>
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-leaf/20 bg-leaf/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-leaf">
      {children}
    </span>
  );
}

const PRESS = [
  {
    outlet: "Estadão",
    quote:
      "Clientes formam filas para comer manga com sal, limão e leite condensado após vídeo viralizar.",
    href: "https://www.estadao.com.br/pme/salada-manga-sal-limao-leite-condensado-milhoes-visualizacoes-nprei/",
  },
  {
    outlet: "PEGN / Globo",
    quote:
      "Restaurante especializado em salada de manga chama atenção nas redes: 'Não tô acreditando'.",
    href: "https://revistapegn.globo.com/redes-sociais/noticia/2024/05/restaurante-especializado-em-salada-de-manga-chama-atencao-nas-redes-nao-to-acreditando.ghtml",
  },
  {
    outlet: "Diário do Nordeste",
    quote:
      "Cearense adapta negócio dos EUA e vende a fruta de forma inusitada: o Mango Mix.",
    href: "https://diariodonordeste.verdesmares.com.br/verso/manga-com-sal-e-mais-temperos-cearense-adapta-negocio-dos-eua-e-vende-a-fruta-de-forma-inusitada-1.3523533",
  },
];

const WHY = [
  {
    icon: Flame,
    title: "Produto que vende sozinho",
    text: "Manga cortada na hora, temperos escolhidos pelo cliente e um preparo que é espetáculo. A fila vira conteúdo, o conteúdo vira fila.",
  },
  {
    icon: TrendingUp,
    title: "Marca já validada",
    text: "Do quiosque no Eusébio à expansão pelo Ceará: o modelo foi testado na operação real antes de virar franquia.",
  },
  {
    icon: Users,
    title: "Audiência de 1 milhão",
    text: "Mais de 1 milhão de seguidores no Instagram alimentam cada nova unidade com demanda no dia da inauguração.",
  },
  {
    icon: Store,
    title: "Operação enxuta",
    text: "Cardápio curto, poucos insumos, equipe pequena e ponto compacto. Menos complexidade, mais giro.",
  },
  {
    icon: Sparkles,
    title: "Ticket com margem",
    text: "Fruta fresca com adicionais de alto valor percebido: temperos, coberturas e combos que elevam o ticket médio.",
  },
  {
    icon: MapPin,
    title: "Territórios abertos",
    text: "Praças em todo o Brasil ainda disponíveis. Chegar primeiro na sua cidade é a maior vantagem competitiva.",
  },
];

const MODELS = [
  {
    icon: Store,
    name: "Quiosque de shopping",
    desc: "O formato-mãe da marca. Alto fluxo, operação compacta e vitrine que atrai o público de passagem.",
    points: ["A partir de ~9 m²", "Equipe de 2 a 4 pessoas", "Alto impulso de compra"],
  },
  {
    icon: Building2,
    name: "Loja de rua",
    desc: "Para bairros de grande circulação e cidades litorâneas, com espaço para consumo no local e delivery.",
    points: ["Espaço para consumo", "Delivery e retirada", "Marca com fachada própria"],
  },
  {
    icon: Truck,
    name: "Contêiner / eventos",
    desc: "Formato móvel para praias, feiras e grandes eventos — a porta de entrada com menor investimento.",
    points: ["Mobilidade total", "Ideal para sazonalidade", "Menor investimento inicial"],
  },
];

const STEPS = [
  { n: "01", t: "Preencha o formulário", d: "Conte sua cidade, seu perfil e o capital disponível. Leva menos de 2 minutos." },
  { n: "02", t: "Conversa com o time", d: "Nosso time de expansão liga para entender seu objetivo e apresentar os modelos." },
  { n: "03", t: "Análise de praça e viabilidade", d: "Avaliamos disponibilidade do território e o potencial do ponto." },
  { n: "04", t: "Assinatura e inauguração", d: "Contrato, obra, treinamento na operação-escola e abertura com apoio de marketing." },
];

const FAQ = [
  {
    q: "Preciso ter experiência com alimentação?",
    a: "Não. A maioria dos nossos franqueados vem de outras áreas. O treinamento cobre preparo, padrão de corte, temperos, atendimento, gestão de estoque e rotinas do dia a dia.",
  },
  {
    q: "Qual é o investimento?",
    a: "O valor varia conforme o modelo de unidade (quiosque, loja de rua ou contêiner), o ponto e a praça. Enviamos a apresentação completa com investimento, taxas e projeções após o primeiro contato.",
  },
  {
    q: "Vocês ajudam a escolher o ponto?",
    a: "Sim. Fazemos análise de praça, avaliamos as opções de ponto e negociamos junto com você antes de fechar qualquer contrato de locação.",
  },
  {
    q: "Como funciona o fornecimento da manga?",
    a: "Trabalhamos com padrão de fruta, corte e temperos definidos pela franqueadora, com orientação de fornecedores homologados e checklist de qualidade em cada unidade.",
  },
  {
    q: "Existe exclusividade de território?",
    a: "Sim. Cada unidade tem uma área de atuação protegida, definida no contrato de acordo com o potencial da região.",
  },
  {
    q: "Em quanto tempo consigo abrir?",
    a: "Depende do ponto e da obra. Com o ponto aprovado, o processo padrão de implantação costuma ser de poucos meses até a inauguração.",
  },
];

function LeadForm({ compact = false }: { compact?: boolean }) {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    capital_range: "",
    timeline: "",
    message: "",
  });

  const set = (k: keyof typeof form) => (v: string) => setForm((f) => ({ ...f, [k]: v }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    const { error } = await supabase.from("franchise_leads").insert({
      ...form,
      source: compact ? "hero" : "homepage",
    });
    setLoading(false);
    if (error) {
      toast.error("Não conseguimos enviar agora. Tente novamente em instantes.");
      return;
    }
    setDone(true);
    toast.success("Recebemos seu interesse! Nosso time de expansão vai falar com você.");
  }

  if (done) {
    return (
      <div className="rounded-3xl border border-leaf/15 bg-card p-10 text-center">
        <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-leaf" />
        <h3 className="mb-2 text-2xl font-bold">Interesse enviado 🥭</h3>
        <p className="text-muted-foreground">
          Nosso time de expansão entra em contato pelo WhatsApp com a apresentação completa da franquia.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border border-leaf/15 bg-card p-6 shadow-xl md:p-8">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="md:col-span-2">
          <Label htmlFor="full_name">Nome completo *</Label>
          <Input
            id="full_name"
            required
            value={form.full_name}
            onChange={(e) => set("full_name")(e.target.value)}
            placeholder="Seu nome"
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="email">E-mail *</Label>
          <Input
            id="email"
            type="email"
            required
            value={form.email}
            onChange={(e) => set("email")(e.target.value)}
            placeholder="voce@email.com"
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="phone">WhatsApp *</Label>
          <Input
            id="phone"
            required
            value={form.phone}
            onChange={(e) => set("phone")(e.target.value)}
            placeholder="(85) 90000-0000"
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="city">Cidade de interesse</Label>
          <Input
            id="city"
            value={form.city}
            onChange={(e) => set("city")(e.target.value)}
            placeholder="Fortaleza"
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="state">Estado</Label>
          <Input
            id="state"
            value={form.state}
            onChange={(e) => set("state")(e.target.value)}
            placeholder="CE"
            className="mt-1.5"
          />
        </div>
        <div>
          <Label>Capital disponível</Label>
          <Select value={form.capital_range} onValueChange={set("capital_range")}>
            <SelectTrigger className="mt-1.5">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ate-100k">Até R$ 100 mil</SelectItem>
              <SelectItem value="100k-200k">R$ 100 mil a R$ 200 mil</SelectItem>
              <SelectItem value="200k-350k">R$ 200 mil a R$ 350 mil</SelectItem>
              <SelectItem value="acima-350k">Acima de R$ 350 mil</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Quando pretende abrir</Label>
          <Select value={form.timeline} onValueChange={set("timeline")}>
            <SelectTrigger className="mt-1.5">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="imediato">O quanto antes</SelectItem>
              <SelectItem value="3-meses">Em até 3 meses</SelectItem>
              <SelectItem value="6-meses">Em até 6 meses</SelectItem>
              <SelectItem value="pesquisando">Ainda pesquisando</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="message">Conte um pouco sobre você</Label>
          <Textarea
            id="message"
            rows={3}
            value={form.message}
            onChange={(e) => set("message")(e.target.value)}
            placeholder="Já empreendeu antes? Tem ponto em vista?"
            className="mt-1.5"
          />
        </div>
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={loading}
        className="mt-6 h-14 w-full rounded-full bg-leaf text-base font-bold text-mango hover:bg-leaf/90"
      >
        {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Quero receber a apresentação da franquia"}
        {!loading && <ArrowRight className="ml-2 h-5 w-5" />}
      </Button>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        Sem compromisso. Seus dados são usados apenas para o contato do time de expansão.
      </p>
    </form>
  );
}

export default function MangoMixFranquia() {
  return (
    <div className="min-h-screen bg-cream text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-leaf/10 bg-cream/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5">
          <a href="#topo" className="flex items-center gap-2.5">
            <img src={logo} alt="Mango Mix" width={40} height={40} className="h-10 w-10 object-contain" />
            <span className="font-display text-lg font-extrabold tracking-tight text-leaf">
              MANGO MIX <span className="font-medium text-muted-foreground">| Franquias</span>
            </span>
          </a>
          <nav className="hidden items-center gap-7 text-sm font-medium md:flex">
            <a href="#fenomeno" className="text-muted-foreground transition-colors hover:text-leaf">O fenômeno</a>
            <a href="#modelos" className="text-muted-foreground transition-colors hover:text-leaf">Modelos</a>
            <a href="#como-funciona" className="text-muted-foreground transition-colors hover:text-leaf">Como funciona</a>
            <a href="#duvidas" className="text-muted-foreground transition-colors hover:text-leaf">Dúvidas</a>
          </nav>
          <Button asChild className="rounded-full bg-leaf font-bold text-mango hover:bg-leaf/90">
            <a href="#quero-ser-franqueado">Quero ser franqueado</a>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section id="topo" className="relative overflow-hidden bg-leaf">
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-mango/20 blur-3xl" />
        <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-5 py-16 md:grid-cols-2 md:py-24">
          <motion.div initial="hidden" animate="show" variants={fadeUp}>
            <span className="inline-flex items-center gap-2 rounded-full bg-mango/15 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-mango">
              <Sparkles className="h-3.5 w-3.5" /> Expansão nacional 2026
            </span>
            <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] text-cream md:text-6xl">
              A manga temperada que virou{" "}
              <span className="text-mango">febre no Ceará</span> agora é franquia.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/80">
              O Mango Mix nasceu em um quiosque no Eusébio, viralizou nas redes com filas na porta e
              hoje abre praças em todo o Brasil. Seja o primeiro a levar a marca para a sua cidade.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="h-14 rounded-full bg-mango px-8 text-base font-bold text-leaf hover:bg-mango/90"
              >
                <a href="#quero-ser-franqueado">
                  Quero ser franqueado <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-14 rounded-full border-cream/30 bg-transparent px-8 text-base font-semibold text-cream hover:bg-cream/10 hover:text-cream"
              >
                <a href={IG_PROFILE} target="_blank" rel="noreferrer">
                  <Instagram className="mr-2 h-5 w-5" /> Ver no Instagram
                </a>
              </Button>
            </div>
            <div className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-cream/15 pt-6">
              {[
                { n: "1M+", l: "seguidores no Instagram" },
                { n: "2023", l: "primeiro quiosque, Eusébio/CE" },
                { n: "600+", l: "vídeos que viraram fila" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-display text-2xl font-extrabold text-mango md:text-3xl">{s.n}</div>
                  <div className="mt-1 text-xs leading-tight text-cream/70">{s.l}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <img
              src={heroImg}
              alt="Copo de manga temperada com limão e pimenta do Mango Mix"
              width={1600}
              height={1104}
              className="w-full rounded-[2rem] object-cover shadow-2xl"
            />
            <div className="absolute -bottom-5 -left-5 hidden rounded-2xl bg-cream px-5 py-4 shadow-xl md:block">
              <div className="font-display text-xl font-extrabold text-leaf">Fila na porta</div>
              <div className="text-xs text-muted-foreground">desde o primeiro vídeo viral</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Faixa de imprensa */}
      <div className="border-y border-leaf/10 bg-mango">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-2 px-5 py-4 text-sm font-bold uppercase tracking-wider text-leaf">
          <span className="opacity-60">Visto em</span>
          <span>Estadão</span>
          <span>PEGN / Globo</span>
          <span>Diário do Nordeste</span>
          <span>TikTok &amp; Instagram</span>
        </div>
      </div>

      {/* O fenômeno */}
      <Section id="fenomeno">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <Eyebrow>O fenômeno</Eyebrow>
            <h2 className="mt-5 font-display text-3xl font-extrabold leading-tight md:text-5xl">
              Um produto simples. Uma marca que o Brasil inteiro quis provar.
            </h2>
            <div className="prose-readable mt-6 space-y-4 text-lg leading-relaxed text-muted-foreground">
              <p>
                Pedro Gonçalves Neto — o Pepe Neto — trouxe para o Ceará um hábito que viu nos Estados
                Unidos: manga cortada em tiras, temperada na hora com sal, limão, pimenta, leite
                condensado e o que mais o cliente quiser.
              </p>
              <p>
                O preparo virou vídeo, o vídeo virou milhões de visualizações e o quiosque do Eusébio
                virou destino. Hoje o Mango Mix é uma das marcas de alimentação mais comentadas do
                Nordeste — e a franqueadora está estruturada para expandir.
              </p>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                "Fruta cortada na hora, sem estoque parado",
                "Cardápio curto e fácil de treinar",
                "Marketing nacional puxado pelas redes",
                "Público de todas as idades",
              ].map((t) => (
                <div key={t} className="flex items-start gap-2.5 text-sm font-medium">
                  <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 shrink-0 text-leaf" />
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-4">
            <img
              src={kioskImg}
              alt="Quiosque do Mango Mix com fila de clientes"
              loading="lazy"
              width={1408}
              height={1008}
              className="w-full rounded-3xl object-cover shadow-lg"
            />
            <img
              src={flatlayImg}
              alt="Variedades de manga temperada com diferentes coberturas"
              loading="lazy"
              width={1408}
              height={912}
              className="w-full rounded-3xl object-cover shadow-lg"
            />
          </div>
        </div>
      </Section>

      {/* Instagram */}
      <Section className="bg-leaf text-cream">
        <div className="grid gap-10 lg:grid-cols-[1fr_420px] lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-mango/15 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-mango">
              <Instagram className="h-3.5 w-3.5" /> @mangomixoficial
            </span>
            <h2 className="mt-5 font-display text-3xl font-extrabold leading-tight md:text-5xl">
              1 milhão de pessoas já assistiram. <span className="text-mango">Elas vão até a loja.</span>
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-cream/80">
              Cada vídeo do preparo gera desejo — e desejo gera fila. Como franqueado, você opera com o
              marketing da marca trabalhando por você todos os dias, sem precisar construir audiência do zero.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="h-13 rounded-full bg-mango px-7 font-bold text-leaf hover:bg-mango/90">
                <a href="#quero-ser-franqueado">
                  Quero esse fluxo na minha cidade <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-13 rounded-full border-cream/30 bg-transparent px-7 font-semibold text-cream hover:bg-cream/10 hover:text-cream"
              >
                <a href={IG_PROFILE} target="_blank" rel="noreferrer">
                  Abrir o perfil
                </a>
              </Button>
            </div>
          </div>

          <div className="mx-auto w-full max-w-[420px] overflow-hidden rounded-3xl bg-cream shadow-2xl">
            <iframe
              src="https://www.instagram.com/mangomixoficial/embed"
              title="Vídeos do Instagram do Mango Mix"
              loading="lazy"
              scrolling="no"
              allowTransparency
              className="h-[560px] w-full border-0"
            />
          </div>
        </div>
      </Section>

      {/* Por que investir */}
      <Section id="por-que">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>Por que investir</Eyebrow>
          <h2 className="mt-5 font-display text-3xl font-extrabold leading-tight md:text-5xl">
            Seis motivos para colocar o Mango Mix na sua praça
          </h2>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {WHY.map((w, i) => (
            <motion.div
              key={w.title}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              transition={{ delay: i * 0.05 }}
              className="rounded-3xl border border-leaf/10 bg-card p-7 shadow-sm transition-shadow hover:shadow-lg"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-mango">
                <w.icon className="h-6 w-6 text-leaf" />
              </div>
              <h3 className="font-display text-xl font-bold">{w.title}</h3>
              <p className="mt-2.5 leading-relaxed text-muted-foreground">{w.text}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Modelos */}
      <Section id="modelos" className="bg-mango/15">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>Modelos de unidade</Eyebrow>
          <h2 className="mt-5 font-display text-3xl font-extrabold leading-tight md:text-5xl">
            Escolha o formato que combina com o seu bolso e a sua cidade
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Valores de investimento, taxas e projeções são enviados na apresentação completa, de acordo
            com o modelo e a praça escolhida.
          </p>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {MODELS.map((m) => (
            <div key={m.name} className="flex flex-col rounded-3xl border border-leaf/10 bg-card p-7 shadow-sm">
              <m.icon className="h-8 w-8 text-leaf" />
              <h3 className="mt-5 font-display text-2xl font-bold">{m.name}</h3>
              <p className="mt-2.5 leading-relaxed text-muted-foreground">{m.desc}</p>
              <ul className="mt-5 space-y-2 border-t border-leaf/10 pt-5">
                {m.points.map((p) => (
                  <li key={p} className="flex items-center gap-2 text-sm font-medium">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-leaf" /> {p}
                  </li>
                ))}
              </ul>
              <Button
                asChild
                className="mt-6 w-full rounded-full bg-leaf font-bold text-mango hover:bg-leaf/90"
              >
                <a href="#quero-ser-franqueado">Ver investimento</a>
              </Button>
            </div>
          ))}
        </div>
      </Section>

      {/* Fundador */}
      <Section>
        <div className="grid items-center gap-12 md:grid-cols-[420px_1fr]">
          <img
            src={founderImg}
            alt="Franqueado do Mango Mix servindo manga temperada"
            loading="lazy"
            width={1200}
            height={1408}
            className="w-full rounded-3xl object-cover shadow-xl"
          />
          <div>
            <Eyebrow>A história</Eyebrow>
            <h2 className="mt-5 font-display text-3xl font-extrabold leading-tight md:text-4xl">
              "Era só manga com sal. Virou a fila que não acaba."
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              O que começou como uma ideia trazida de fora ganhou um sotaque cearense e uma legião de
              fãs. Pepe Neto transformou um quiosque no Eusébio em uma marca reconhecida nacionalmente
              e agora abre o modelo para empreendedores que querem crescer junto.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {PRESS.map((p) => (
                <a
                  key={p.outlet}
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group rounded-2xl border border-leaf/10 bg-card p-5 transition-colors hover:border-leaf/30"
                >
                  <Quote className="h-5 w-5 text-mango" />
                  <p className="mt-3 text-sm leading-snug text-muted-foreground">{p.quote}</p>
                  <span className="mt-3 block text-xs font-bold uppercase tracking-wider text-leaf">
                    {p.outlet}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Como funciona */}
      <Section id="como-funciona" className="bg-leaf text-cream">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-mango/15 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-mango">
            Como funciona
          </span>
          <h2 className="mt-5 font-display text-3xl font-extrabold leading-tight md:text-5xl">
            Do primeiro contato à inauguração em 4 passos
          </h2>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-4">
          {STEPS.map((s) => (
            <div key={s.n} className="rounded-3xl border border-cream/15 bg-cream/5 p-7">
              <div className="font-display text-4xl font-extrabold text-mango">{s.n}</div>
              <h3 className="mt-4 font-display text-lg font-bold">{s.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-cream/70">{s.d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Formulário */}
      <Section id="quero-ser-franqueado">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <div className="lg:sticky lg:top-24">
            <Eyebrow>Vagas por território</Eyebrow>
            <h2 className="mt-5 font-display text-3xl font-extrabold leading-tight md:text-5xl">
              Garanta a sua cidade antes que alguém garanta.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Preencha o formulário e receba a apresentação completa da franquia: modelos de unidade,
              investimento, suporte, treinamento e projeção de retorno.
            </p>
            <ul className="mt-8 space-y-3">
              {[
                "Apresentação completa em PDF",
                "Conversa com o time de expansão",
                "Análise de disponibilidade da sua praça",
                "Sem taxa e sem compromisso",
              ].map((t) => (
                <li key={t} className="flex items-center gap-3 font-medium">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-leaf" /> {t}
                </li>
              ))}
            </ul>
          </div>
          <LeadForm />
        </div>
      </Section>

      {/* FAQ */}
      <Section id="duvidas" className="bg-mango/15">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <Eyebrow>Dúvidas frequentes</Eyebrow>
            <h2 className="mt-5 font-display text-3xl font-extrabold leading-tight md:text-4xl">
              Tudo o que futuros franqueados perguntam
            </h2>
          </div>
          <Accordion type="single" collapsible className="mt-10">
            {FAQ.map((f) => (
              <AccordionItem key={f.q} value={f.q} className="border-leaf/15">
                <AccordionTrigger className="text-left font-display text-lg font-bold hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-base leading-relaxed text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>

      {/* CTA final */}
      <section className="bg-leaf px-5 py-20 text-center text-cream md:py-28">
        <div className="mx-auto max-w-3xl">
          <img src={logo} alt="" loading="lazy" width={96} height={96} className="mx-auto h-24 w-24 object-contain" />
          <h2 className="mt-8 font-display text-3xl font-extrabold leading-tight md:text-5xl">
            A manga do Ceará já é nacional. <span className="text-mango">Falta você.</span>
          </h2>
          <p className="mt-5 text-lg text-cream/80">
            Fale com o time de expansão e descubra se a sua cidade ainda está disponível.
          </p>
          <Button
            asChild
            size="lg"
            className="mt-8 h-14 rounded-full bg-mango px-10 text-base font-bold text-leaf hover:bg-mango/90"
          >
            <a href="#quero-ser-franqueado">
              Quero ser franqueado <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-leaf/10 bg-cream px-5 py-10">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row">
          <div className="flex items-center gap-2.5">
            <img src={logo} alt="" loading="lazy" width={32} height={32} className="h-8 w-8 object-contain" />
            <span className="font-display font-bold text-leaf">MANGO MIX</span>
          </div>
          <p className="text-center">
            Eusébio · Aquiraz · Ceará — Brasil. Expansão de franquias em todo o país.
          </p>
          <div className="flex items-center gap-4">
            <a href={IG_PROFILE} target="_blank" rel="noreferrer" className="transition-colors hover:text-leaf">
              <Instagram className="h-5 w-5" />
            </a>
            <Link to="/plataforma" className="transition-colors hover:text-leaf">
              Área do organizador
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
