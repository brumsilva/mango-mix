import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import {
  ArrowRight,
  Instagram,
  MapPin,
  Sparkles,
  Flame,
  TrendingUp,
  Users,
  Store,
  CheckCircle2,
  Quote,
  Loader2,
  BadgeDollarSign,
  PackageCheck,
  Play,
  Eye,
  Volume2,
  VolumeX,
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
import viral127mVideo from "@/assets/reels/tiktok-12-7m.mp4";
import viral127mPoster from "@/assets/reels/tiktok-12-7m.jpg";
import viral64mVideo from "@/assets/reels/tiktok-6-4m.mp4";
import viral64mPoster from "@/assets/reels/tiktok-6-4m.jpg";
import viral55mVideo from "@/assets/reels/tiktok-5-5m.mp4";
import viral55mPoster from "@/assets/reels/tiktok-5-5m.jpg";

const IG_PROFILE = "https://www.instagram.com/mangomixoficial/";

const VIRAL_REELS = [
  {
    id: "7528168792057302277",
    views: "12,7 milhões",
    kicker: "O maior viral",
    title: "A manga mais famosa do mundo virou desejo em escala nacional. 🥭🌎",
    text: "O vídeo líder do perfil transforma preparo, textura e sabor em 12,7 milhões de oportunidades de descoberta da marca.",
    video: viral127mVideo,
    poster: viral127mPoster,
  },
  {
    id: "7424262911142595845",
    views: "6,4 milhões",
    kicker: "Comunidade que volta",
    title: "A cliente viralizou, voltou e virou parte da história. 🥭✨",
    text: "Conteúdo com pessoas reais cria reconhecimento, recorrência e uma comunidade que acompanha a marca além da primeira compra.",
    video: viral64mVideo,
    poster: viral64mPoster,
  },
  {
    id: "7574861449630207252",
    views: "5,5 milhões",
    kicker: "Inauguração que repercute",
    title: "Uma nova unidade já nasce com atenção digital. 🚀🥭",
    text: "A inauguração no North Shopping mostra como expansão física e distribuição social trabalham juntas para gerar desejo local.",
    video: viral55mVideo,
    poster: viral55mPoster,
  },
];

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
    <section id={id} className={`relative overflow-hidden border-b-[3px] border-leaf px-5 py-20 md:py-28 ${className}`}>
      <div className="relative z-10 mx-auto w-full max-w-6xl">
        {children}
        {id !== "quero-ser-franqueado" && (
          <div className="mt-14 flex justify-center">
            <Button asChild size="lg" className="h-14 rounded-full border-[3px] border-leaf bg-chili px-8 font-extrabold text-cream shadow-[6px_7px_0_hsl(var(--leaf))] hover:bg-chili/90">
              <a href="#quero-ser-franqueado">Quero ser franqueado 🥭 <ArrowRight className="ml-2 h-5 w-5" /></a>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex -rotate-1 items-center gap-2 rounded-full border-2 border-leaf bg-mango px-4 py-2 text-xs font-extrabold uppercase tracking-[0.18em] text-leaf shadow-[4px_4px_0_hsl(var(--leaf))]">
      {children}
    </span>
  );
}

const PRESS = [
  {
    outlet: "Estadão",
    logo: "ESTADÃO",
    logoClass: "font-serif text-2xl font-black tracking-[-0.05em]",
    quote:
      "Clientes formam filas para comer manga com sal, limão e leite condensado após vídeo viralizar.",
    href: "https://www.estadao.com.br/pme/salada-manga-sal-limao-leite-condensado-milhoes-visualizacoes-nprei/",
  },
  {
    outlet: "PEGN / Globo",
    logo: "PEGN",
    logoClass: "font-sans text-2xl font-black tracking-[-0.06em] text-chili",
    quote:
      "Restaurante especializado em salada de manga chama atenção nas redes: 'Não tô acreditando'.",
    href: "https://revistapegn.globo.com/redes-sociais/noticia/2024/05/restaurante-especializado-em-salada-de-manga-chama-atencao-nas-redes-nao-to-acreditando.ghtml",
  },
  {
    outlet: "Diário do Nordeste",
    logo: "Diário do Nordeste",
    logoClass: "font-serif text-xl font-bold italic tracking-tight",
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
    title: "Audiência comprovada",
    text: "O Instagram oficial reúne 1,2 milhão de seguidores, enquanto o TikTok soma 352,9 mil seguidores e 3,9 milhões de curtidas.",
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

const INVESTMENT = [
  {
    icon: BadgeDollarSign,
    name: "Taxa de franquia",
    desc: "Seu investimento inclui o acesso à marca, ao método operacional e à implantação acompanhada pelo time Mango Mix.",
    points: ["Licença de uso da marca", "Transferência de know-how", "Apoio de expansão"],
  },
  {
    icon: Store,
    name: "Estrutura da unidade",
    desc: "O formato contempla a estrutura padronizada do quiosque e as orientações necessárias para colocar a operação de pé.",
    points: ["Projeto arquitetônico orientado", "Estrutura padronizada", "Vitrine de alto impacto"],
  },
  {
    icon: PackageCheck,
    name: "Equipamentos e implantação",
    desc: "Também fazem parte do planejamento os equipamentos, utensílios, materiais e o suporte para treinamento da equipe.",
    points: ["Cervejeira e freezer", "Utensílios e materiais", "Deslocamento da equipe de treinamento"],
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
    a: "O valor é apresentado individualmente após a qualificação da praça e do formato. O investimento contempla taxa de franquia, estrutura da unidade, equipamentos, utensílios, materiais, implantação e treinamento; a composição final varia conforme cidade e ponto.",
  },
  {
    q: "Qual é o prazo de retorno?",
    a: "A franqueadora informa uma estimativa de payback entre 4 e 5 meses no cenário atual, com rentabilidade indicada entre 30% e 35%. Esses números são referências comerciais, não garantia de resultado: desempenho depende de praça, ponto, gestão, custos e vendas de cada unidade.",
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

function AutoplayVideo({
  src,
  poster,
  soundEnabled,
  onVisible,
  active = true,
  className = "",
}: {
  src: string;
  poster: string;
  soundEnabled: boolean;
  onVisible?: () => void;
  active?: boolean;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const visibleRef = useRef(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !soundEnabled;
    if (soundEnabled && active && visibleRef.current && !reduceMotion) {
      void video.play().catch(() => undefined);
    }
  }, [active, reduceMotion, soundEnabled]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    video.currentTime = 0;
    if (reduceMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          onVisible?.();
        }
        if (entry.isIntersecting && active) {
          void video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { threshold: 0.55 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [active, onVisible, reduceMotion, src]);

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      muted={!soundEnabled}
      loop
      playsInline
      preload="metadata"
      controls={Boolean(reduceMotion)}
      className={className}
      aria-label="Vídeo do perfil oficial Mango Mix"
    />
  );
}

function ViralReelsStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [mobileActive, setMobileActive] = useState(0);
  const [soundFor, setSoundFor] = useState<number | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const next = Math.min(VIRAL_REELS.length - 1, Math.floor(progress * VIRAL_REELS.length));
    setActive((current) => (current === next ? current : next));
  });

  const reel = VIRAL_REELS[active];

  return (
    <>
      <section className="relative overflow-hidden bg-mango px-5 py-20 text-leaf lg:hidden" aria-label="Reels de maior alcance no celular">
        <div className="pointer-events-none absolute -right-24 top-40 h-72 w-72 rounded-full border-[42px] border-cream/35" />
        <div className="relative mx-auto max-w-md">
          <span className="inline-flex -rotate-2 items-center gap-2 rounded-full border-2 border-leaf bg-cream px-4 py-2 text-xs font-extrabold uppercase tracking-[0.18em] shadow-[4px_4px_0_hsl(var(--leaf))]">
            <Play className="h-3.5 w-3.5 fill-current" /> Aperte o play com o scroll
          </span>
          <h2 className="mt-8 font-sans text-[clamp(3.5rem,17vw,5.5rem)] font-black leading-[0.86] tracking-[-0.075em]">
            Conteúdo
            <span className="block text-leaf/75">que vira</span>
            <span className="mt-3 inline-block -rotate-2 rounded-full border-[3px] border-leaf bg-chili px-5 py-2 text-cream shadow-[6px_6px_0_hsl(var(--leaf))]">fila.</span>
          </h2>
          <p className="mt-8 max-w-sm text-base font-semibold leading-relaxed text-leaf/80">
            Os três maiores virais da marca, agora dentro da experiência. Cada vídeo começa sozinho quando entra em cena.
          </p>

          <div className="mt-12 grid gap-14">
            {VIRAL_REELS.map((item, index) => (
              <article
                key={item.id}
                className={`relative rounded-[2rem] border-[3px] border-leaf bg-cream p-3 shadow-[9px_10px_0_hsl(var(--leaf))] ${index === 1 ? "rotate-1" : "-rotate-1"}`}
              >
                <div className="flex items-center justify-between gap-4 px-2 py-2">
                  <span className="text-[0.65rem] font-extrabold uppercase tracking-[0.18em]">TikTok 0{index + 1} · {item.kicker}</span>
                  <span className="rounded-full bg-leaf px-3 py-1 font-display text-sm font-extrabold text-mango">{item.views}</span>
                </div>
                <div className="relative aspect-[9/16] overflow-hidden rounded-[1.35rem] border-2 border-leaf bg-leaf">
                  <AutoplayVideo
                    src={item.video}
                    poster={item.poster}
                    soundEnabled={soundFor === index}
                    active={mobileActive === index}
                    onVisible={() => setMobileActive(index)}
                    className="h-full w-full object-cover"
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-leaf/90 via-leaf/35 to-transparent px-5 pb-5 pt-20 text-cream">
                    <h3 className="font-display text-2xl font-extrabold leading-tight">{item.title}</h3>
                  </div>
                  <span className={`absolute left-4 top-4 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[0.65rem] font-extrabold uppercase tracking-wider text-cream ${mobileActive === index ? "bg-chili" : "bg-leaf/80"}`}>
                    <span className={`h-2 w-2 rounded-full bg-cream ${mobileActive === index ? "motion-safe:animate-pulse" : ""}`} /> {reduceMotion ? "Toque para reproduzir" : mobileActive === index ? "Em exibição" : "Role para assistir"}
                  </span>
                  <button
                    type="button"
                    onClick={() => setSoundFor((current) => current === index ? null : index)}
                    className="absolute right-4 top-4 z-10 inline-flex items-center gap-2 rounded-full border-2 border-leaf bg-cream px-3 py-2 text-[0.65rem] font-extrabold uppercase tracking-wider text-leaf shadow-[3px_3px_0_hsl(var(--leaf))]"
                    aria-label={soundFor === index ? "Desativar som deste vídeo" : "Ativar som deste vídeo"}
                  >
                    {soundFor === index ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
                    {soundFor === index ? "Som ligado" : "Ativar som"}
                  </button>
                </div>
                <p className="px-3 pb-3 pt-4 text-sm font-medium leading-relaxed text-leaf/75">{item.text}</p>
              </article>
            ))}
          </div>
          <Button asChild size="lg" className="mt-16 h-14 w-full rounded-full border-[3px] border-leaf bg-chili font-extrabold text-cream shadow-[6px_7px_0_hsl(var(--leaf))]">
            <a href="#quero-ser-franqueado">Quero levar essa atenção para minha cidade 🥭</a>
          </Button>
        </div>
      </section>

      <section ref={sectionRef} className="relative hidden min-h-[330svh] bg-mango text-leaf lg:block" aria-label="Reels de maior alcance">
        <div className="sticky top-0 flex min-h-screen items-center overflow-hidden px-5 py-12">
          <div className="pointer-events-none absolute -left-20 -top-20 h-80 w-80 rounded-full border-[52px] border-cream/40" />
          <div className="pointer-events-none absolute -bottom-32 right-1/3 h-96 w-96 rounded-full border-[62px] border-chili/20" />
          <div className="pointer-events-none absolute inset-x-0 top-5 overflow-hidden whitespace-nowrap font-display text-[8rem] font-extrabold uppercase leading-none tracking-[-0.08em] text-cream/25 xl:text-[11rem]">
            Stop scroll · stop scroll ·
          </div>

          <div className="relative mx-auto grid w-full max-w-7xl items-center gap-16 lg:grid-cols-[1fr_430px]">
            <div className="pt-12">
              <span className="inline-flex -rotate-2 items-center gap-2 rounded-full border-2 border-leaf bg-cream px-5 py-2.5 text-xs font-extrabold uppercase tracking-[0.18em] shadow-[5px_5px_0_hsl(var(--leaf))]">
                <Play className="h-3.5 w-3.5 fill-current" /> Conteúdo que vira fila
              </span>
              <h2 className="mt-8 font-sans text-[clamp(4.2rem,7vw,7.2rem)] font-black leading-[0.85] tracking-[-0.075em]">
                Pare o
                <span className="block text-leaf/75">scroll.</span>
                <span className="mt-4 inline-block -rotate-2 rounded-full border-[4px] border-leaf bg-chili px-7 py-2 text-cream shadow-[8px_8px_0_hsl(var(--leaf))]">Crie fila.</span>
              </h2>

              <motion.div
                key={reel.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="mt-9 max-w-2xl border-l-4 border-leaf pl-6"
              >
                <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-leaf/60">{reel.kicker}</p>
                <div className="mt-1 flex items-end gap-3">
                  <span className="font-display text-5xl font-extrabold tracking-tight xl:text-6xl">{reel.views}</span>
                  <span className="pb-2 text-xs font-bold uppercase tracking-wider text-leaf/60">views no TikTok</span>
                </div>
                <h3 className="mt-4 max-w-xl font-display text-2xl font-extrabold leading-tight">{reel.title}</h3>
                <p className="mt-3 max-w-xl leading-relaxed text-leaf/75">{reel.text}</p>
              </motion.div>

              <div className="mt-9 flex items-center gap-3" aria-label={`Cena ${active + 1} de ${VIRAL_REELS.length}`}>
                {VIRAL_REELS.map((item, index) => (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => setActive(index)}
                    aria-label={`Exibir Reel ${index + 1}`}
                    className={`h-3 rounded-full border-2 border-leaf transition-all duration-300 ${index === active ? "w-16 bg-chili" : "w-8 bg-cream hover:bg-cream/70"}`}
                  />
                ))}
              </div>
              <Button asChild size="lg" className="mt-8 h-14 rounded-full border-[3px] border-leaf bg-chili px-7 font-extrabold text-cream shadow-[6px_7px_0_hsl(var(--leaf))]">
                <a href="#quero-ser-franqueado">Quero ser franqueado 🥭</a>
              </Button>
            </div>

          <motion.div
            key={reel.id}
            initial={{ opacity: 0, scale: 0.94, rotate: active === 1 ? 1.5 : -1.5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-[315px] rounded-[2.4rem] border-[5px] border-leaf bg-cream p-3 shadow-[16px_18px_0_hsl(var(--leaf))] xl:max-w-[360px]"
          >
            <div className="flex items-center justify-between px-2 pb-3 pt-1">
              <span className="text-[0.65rem] font-extrabold uppercase tracking-[0.2em]">TikTok · Mango Mix original</span>
              <span className="rounded-full bg-leaf px-3 py-1 text-[0.65rem] font-extrabold uppercase tracking-wider text-mango">TikTok 0{active + 1}</span>
            </div>
            <div className="relative aspect-[9/16] overflow-hidden rounded-[1.65rem] border-[3px] border-leaf bg-leaf">
              <AutoplayVideo
                src={reel.video}
                poster={reel.poster}
                soundEnabled={soundFor === active}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-leaf/85 to-transparent px-5 pb-5 pt-24 text-cream">
                <button
                  type="button"
                  onClick={() => setSoundFor((current) => current === active ? null : active)}
                  className="inline-flex items-center gap-2 rounded-full border-2 border-cream bg-leaf/90 px-4 py-2 text-xs font-extrabold uppercase tracking-wider transition-transform hover:-translate-y-0.5"
                  aria-label={soundFor === active ? "Desativar som deste vídeo" : "Ativar som deste vídeo"}
                >
                  {soundFor === active ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                  {soundFor === active ? "Som ligado" : "Ativar som"}
                </button>
                <Eye className="h-5 w-5" />
              </div>
            </div>
            <a
              href={`https://www.tiktok.com/@mangomixoficial/video/${reel.id}`}
              target="_blank"
              rel="noreferrer"
              className="mt-3 flex items-center justify-between rounded-full bg-chili px-5 py-3 text-sm font-extrabold text-cream transition-transform hover:-translate-y-0.5"
            >
              Ver no TikTok <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>
        </div>
        </div>
      </section>
    </>
  );
}

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
    <form onSubmit={handleSubmit} className="rounded-[2rem] border-[3px] border-leaf bg-cream p-6 shadow-[10px_12px_0_hsl(var(--leaf))] md:p-8">
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
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => setAtTop(window.scrollY <= 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="mango-landing min-h-screen bg-cream text-foreground">
      {/* Header */}
      <header className={`sticky top-0 z-50 border-b-[3px] border-leaf bg-cream/95 backdrop-blur-md transition-transform duration-300 ${atTop ? "translate-y-0" : "pointer-events-none -translate-y-full"}`}>
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5">
          <a href="#topo" className="flex items-center gap-2.5">
            <img src={logo} alt="Mango Mix" width={40} height={40} className="h-10 w-10 object-contain" />
            <span className="font-display text-base font-extrabold tracking-tight text-leaf sm:text-lg">
              MANGO MIX <span className="hidden font-medium text-muted-foreground sm:inline">| Franquias</span>
            </span>
          </a>
          <nav className="hidden items-center gap-7 text-sm font-medium md:flex">
            <a href="#fenomeno" className="text-muted-foreground transition-colors hover:text-leaf">O fenômeno</a>
            <a href="#modelos" className="text-muted-foreground transition-colors hover:text-leaf">Investimento</a>
            <a href="#como-funciona" className="text-muted-foreground transition-colors hover:text-leaf">Como funciona</a>
            <a href="#duvidas" className="text-muted-foreground transition-colors hover:text-leaf">Dúvidas</a>
          </nav>
          <Button asChild className="rounded-full border-2 border-leaf bg-leaf font-extrabold text-mango shadow-[3px_3px_0_hsl(var(--mango-deep))] hover:bg-leaf/90">
            <a href="#quero-ser-franqueado">Quero ser franqueado 🥭</a>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section id="topo" className="relative overflow-hidden border-b-[3px] border-leaf bg-mango text-leaf">
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full border-[60px] border-cream/40" />
        <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-5 py-16 md:grid-cols-2 md:py-24">
          <motion.div initial="hidden" animate="show" variants={fadeUp}>
            <span className="inline-flex -rotate-1 items-center gap-2 rounded-full border-2 border-leaf bg-cream px-4 py-2 text-xs font-extrabold uppercase tracking-[0.18em] text-leaf shadow-[4px_4px_0_hsl(var(--leaf))]">
              <Sparkles className="h-3.5 w-3.5" /> Expansão nacional 2026
            </span>
            <h1 className="mt-7 font-sans text-5xl font-black leading-[0.94] tracking-[-0.065em] text-leaf md:text-7xl">
              Uma marca com milhões de views.{" "}
              <span className="mt-2 block text-chili">Uma franquia pronta para a sua cidade.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg font-medium leading-relaxed text-leaf/80">
              Leve o fenômeno da manga temperada para a sua praça com operação compacta, implantação
              acompanhada e uma marca que já conquistou milhões de visualizações. 🥭🚀
            </p>
            <div className="mt-8 grid max-w-xl grid-cols-3 overflow-hidden rounded-2xl border-[3px] border-leaf bg-cream shadow-[5px_6px_0_hsl(var(--leaf))]">
              {[
                { icon: Instagram, n: "1,2 mi", l: "no Instagram", primary: true },
                { icon: Users, n: "352,9 mil", l: "no TikTok", primary: false },
                { icon: Eye, n: "12,7 mi", l: "views", primary: false },
              ].map((s, index) => (
                <div
                  key={s.l}
                  className={`min-w-0 px-3 py-4 text-center sm:px-4 ${index > 0 ? "border-l-2 border-leaf/20" : ""} ${s.primary ? "bg-chili text-cream" : "text-leaf"}`}
                >
                  <s.icon aria-hidden="true" className="mx-auto mb-2 h-5 w-5" />
                  <div className="font-sans text-xl font-black leading-none sm:text-2xl">{s.n}</div>
                  <div className={`mt-2 text-[0.6rem] font-extrabold uppercase tracking-wider sm:text-[0.65rem] ${s.primary ? "text-cream/80" : "text-leaf/65"}`}>
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-3 text-[0.6rem] font-bold uppercase tracking-[0.12em] text-leaf/55">
              Dados públicos dos perfis oficiais · agosto de 2026
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="h-14 rounded-full border-2 border-leaf bg-chili px-8 text-base font-extrabold text-cream shadow-[5px_5px_0_hsl(var(--leaf))] hover:bg-chili/90"
              >
                <a href="#quero-ser-franqueado">
                  Quero ser franqueado <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-14 rounded-full border-2 border-leaf bg-cream px-8 text-base font-extrabold text-leaf shadow-[5px_5px_0_hsl(var(--leaf))] hover:bg-cream/80 hover:text-leaf"
              >
                <a href={IG_PROFILE} target="_blank" rel="noreferrer">
                  <Instagram className="mr-2 h-5 w-5" /> Ver no Instagram
                </a>
              </Button>
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
              className="w-full -rotate-1 rounded-[2rem] border-[4px] border-leaf object-cover shadow-[14px_16px_0_hsl(var(--leaf))]"
            />
            <div className="absolute -bottom-5 -left-5 hidden rotate-2 rounded-2xl border-[3px] border-leaf bg-cream px-5 py-4 shadow-[6px_7px_0_hsl(var(--leaf))] md:block">
              <div className="font-display text-xl font-extrabold text-leaf">Fila na porta</div>
              <div className="text-xs text-muted-foreground">desde o primeiro vídeo viral</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Faixa de imprensa */}
      <div className="border-b-[3px] border-leaf bg-cream">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-2 px-5 py-4 text-sm font-bold uppercase tracking-wider text-leaf">
          <span className="opacity-60">Visto em</span>
          <span>Estadão</span>
          <span>PEGN / Globo</span>
          <span>Diário do Nordeste</span>
          <span>Instagram &amp; TikTok</span>
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
                <div key={t} className="flex items-start gap-2.5 rounded-2xl border-2 border-leaf bg-mango/25 p-3 text-sm font-bold">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-leaf" />
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-7">
            <img
              src={kioskImg}
              alt="Quiosque do Mango Mix com fila de clientes"
              loading="lazy"
              width={1408}
              height={1008}
              className="w-full -rotate-1 rounded-3xl border-[3px] border-leaf object-cover shadow-[9px_10px_0_hsl(var(--leaf))]"
            />
            <img
              src={flatlayImg}
              alt="Variedades de manga temperada com diferentes coberturas"
              loading="lazy"
              width={1408}
              height={912}
              className="w-full rotate-1 rounded-3xl border-[3px] border-leaf object-cover shadow-[9px_10px_0_hsl(var(--leaf))]"
            />
          </div>
        </div>
      </Section>

      {/* TikTok stop-scroll — selected top-performing videos */}
      <ViralReelsStory />

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
              className="rounded-3xl border-[3px] border-leaf bg-cream p-7 shadow-[7px_8px_0_hsl(var(--leaf))] transition-transform hover:-translate-y-1"
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

      {/* Investimento */}
      <Section id="modelos" className="bg-mango">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>Investimento transparente</Eyebrow>
          <h2 className="mt-5 font-display text-3xl font-extrabold leading-tight md:text-5xl">
            Tudo o que seu investimento coloca em movimento. 🥭
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Mais do que abrir uma unidade, você recebe marca, estrutura, equipamentos e acompanhamento
            para implantar a operação com o padrão Mango Mix.
          </p>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {INVESTMENT.map((m) => (
            <div key={m.name} className="flex flex-col rounded-3xl border-[3px] border-leaf bg-cream p-7 shadow-[8px_9px_0_hsl(var(--leaf))]">
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
                <a href="#quero-ser-franqueado">Receber detalhamento</a>
              </Button>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-10 max-w-4xl -rotate-1 rounded-2xl border-[3px] border-leaf bg-cream px-6 py-5 text-center text-sm font-medium leading-relaxed text-leaf shadow-[6px_7px_0_hsl(var(--leaf))]">
          A composição completa e os valores são apresentados individualmente na conversa com o time de expansão,
          considerando cidade, ponto, formato e necessidades do projeto. 📋✨
        </div>
      </Section>

      {/* Indicadores informados */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <Eyebrow>Referências da operação</Eyebrow>
            <h2 className="mt-5 font-display text-3xl font-extrabold leading-tight md:text-5xl">
              Números reais para uma conversa séria sobre expansão.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Segundo informações comerciais fornecidas pela franqueadora, as primeiras operações mostraram
              forte tração no mês de abertura. Os resultados abaixo são históricos ou projeções declaradas e
              podem não se repetir em outras unidades.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { value: "R$ 119 mil", label: "São José dos Campos", note: "faturamento informado no 1º mês" },
              { value: "R$ 115 mil", label: "Belém do Pará", note: "faturamento informado no 1º mês" },
              { value: "> R$ 200 mil", label: "Vila Velha", note: "projeção informada para o 1º mês" },
              { value: "4–5 meses", label: "Payback estimado", note: "cenário informado com margem de 30%–35%" },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ delay: index * 0.08 }}
                className="rounded-3xl border-[3px] border-leaf bg-cream p-6 shadow-[7px_8px_0_hsl(var(--leaf))]"
              >
                <div className="font-display text-3xl font-extrabold text-leaf">{item.value}</div>
                <div className="mt-2 font-bold">{item.label}</div>
                <div className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.note}</div>
              </motion.div>
            ))}
          </div>
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
            className="w-full -rotate-2 rounded-3xl border-[4px] border-leaf object-cover shadow-[12px_14px_0_hsl(var(--leaf))]"
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
                  className="group rounded-2xl border-2 border-leaf bg-cream p-5 shadow-[4px_5px_0_hsl(var(--leaf))] transition-transform hover:-translate-y-1"
                >
                  <div className="flex min-h-10 items-center justify-between gap-3 border-b-2 border-leaf/15 pb-3" aria-label={`Logo ${p.outlet}`}>
                    <span className={p.logoClass}>{p.logo}</span>
                    <Quote className="h-5 w-5 shrink-0 text-chili" />
                  </div>
                  <p className="mt-4 text-sm leading-snug text-muted-foreground">{p.quote}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Como funciona */}
      <Section id="como-funciona" className="bg-leaf text-cream">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex -rotate-1 items-center gap-2 rounded-full border-2 border-mango bg-cream px-4 py-2 text-xs font-extrabold uppercase tracking-[0.18em] text-leaf shadow-[4px_4px_0_hsl(var(--mango))]">
            Como funciona
          </span>
          <h2 className="mt-5 font-display text-3xl font-extrabold leading-tight md:text-5xl">
            Do primeiro contato à inauguração em 4 passos
          </h2>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-4">
          {STEPS.map((s) => (
            <div key={s.n} className="rounded-3xl border-[3px] border-mango bg-cream p-7 text-leaf shadow-[8px_9px_0_hsl(var(--mango))]">
              <div className="font-sans text-4xl font-black text-chili">{s.n}</div>
              <h3 className="mt-4 font-display text-lg font-extrabold">{s.t}</h3>
              <p className="mt-2 text-sm font-medium leading-relaxed text-leaf/70">{s.d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Formulário */}
      <Section id="quero-ser-franqueado" className="bg-mango">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <div className="lg:sticky lg:top-24">
            <Eyebrow>Vagas por território</Eyebrow>
            <h2 className="mt-5 font-display text-3xl font-extrabold leading-tight md:text-5xl">
              Garanta a sua cidade antes que alguém garanta.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Preencha o formulário e receba a apresentação completa: composição do investimento,
              suporte de ponto e arquitetura, treinamento e premissas da projeção de retorno.
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
      <Section id="duvidas" className="bg-cream">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <Eyebrow>Dúvidas frequentes</Eyebrow>
            <h2 className="mt-5 font-display text-3xl font-extrabold leading-tight md:text-4xl">
              Tudo o que futuros franqueados perguntam
            </h2>
          </div>
          <Accordion type="single" collapsible className="mt-10 space-y-3">
            {FAQ.map((f) => (
              <AccordionItem key={f.q} value={f.q} className="rounded-2xl border-2 border-leaf bg-mango/20 px-5 data-[state=open]:bg-mango/40">
                <AccordionTrigger className="text-left font-display text-lg font-extrabold hover:no-underline">
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
      <section className="relative overflow-hidden border-b-[3px] border-leaf bg-chili px-5 py-20 text-center text-cream md:py-28">
        <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full border-[48px] border-mango/70" />
        <div className="relative mx-auto max-w-4xl">
          <img src={logo} alt="" loading="lazy" width={96} height={96} className="mx-auto h-24 w-24 rotate-3 object-contain" />
          <h2 className="mt-8 font-sans text-4xl font-black leading-[0.95] tracking-[-0.055em] md:text-7xl">
            A manga do Ceará já é nacional. <span className="text-mango">Falta você.</span>
          </h2>
          <p className="mt-5 text-lg text-cream/80">
            Fale com o time de expansão e descubra se a sua cidade ainda está disponível.
          </p>
          <Button
            asChild
            size="lg"
            className="mt-8 h-14 rounded-full border-[3px] border-leaf bg-mango px-10 text-base font-extrabold text-leaf shadow-[6px_7px_0_hsl(var(--leaf))] hover:bg-mango/90"
          >
            <a href="#quero-ser-franqueado">
              Quero ser franqueado <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-[3px] border-leaf bg-mango px-5 py-10">
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
