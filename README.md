# Site Liac Eventos

Espaço para casamentos, eventos sociais e corporativos na Pampulha, em Belo Horizonte (Av. Otacílio Negrão de Lima, 7170, Bandeirantes, CEP 31365-450). Parte do Grupo Let's Go Festas.

Mesma stack e organização do site da Let's Go Festas (base de todos os sites do grupo). Copy das páginas = wireframe aprovado (`referência/liac_eventos_wireframe_v2_copy_seo.html`).

## Rodando

```bash
npm install
cp .env.example .env.local   # preencha as variáveis
npm run dev                  # http://localhost:3000
npm run build && npm start   # produção
```

## Publicar na hospedagem (Docker)

Arquivos: `Dockerfile` (build em 3 etapas, Node 22 Alpine, Next.js `standalone`, usuário sem root, healthcheck), `docker-compose.yml` e `.dockerignore`. Serve para VPS com Docker ou painéis como Coolify, EasyPanel e Portainer.

1. Envie esta pasta para o servidor (sem `node_modules` e `.next`; o `.dockerignore` já tira isso do build).
   - Esta pasta é independente: tem `package.json` e `package-lock.json` próprios.
2. Crie o `.env` a partir do exemplo e preencha: `cp .env.example .env`
   - `NEXT_PUBLIC_SITE_URL=https://liaceventos.com.br` (sem barra no final)
   - `NEXT_PUBLIC_GTM_ID`, `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` (opcionais)
   - `LEAD_WEBHOOK_URL`, `CAREERS_WEBHOOK_URL` (opcionais; vazios = formulários seguem pelo WhatsApp)
   - `HOST_PORT=3001` (porta do servidor onde o site fica exposto)
3. Suba: `docker compose up -d --build`
4. Aponte o domínio para `http://127.0.0.1:3001` com HTTPS, pelo painel da hospedagem ou por um proxy reverso. Exemplo com Caddy (gera o certificado sozinho):

   ```
   liaceventos.com.br, www.liaceventos.com.br {
       reverse_proxy 127.0.0.1:3001
   }
   ```

Dia a dia:

- Atualizar o site: envie os arquivos novos e rode `docker compose up -d --build` de novo.
- Logs: `docker compose logs -f` · Status: `docker compose ps` (mostra `healthy` quando o site responde).
- As variáveis `NEXT_PUBLIC_*` são gravadas **no build**: se mudar, rode com `--build`. Os webhooks são lidos ao iniciar: basta `docker compose up -d`.
- O build precisa de internet (instala os pacotes do npm e baixa as fontes do Google).
- As fotos otimizadas ficam em cache no volume `liac-eventos_next-cache`, que sobrevive às atualizações.
- Os 3 sites do grupo podem rodar no mesmo servidor: Let's Go na porta 3000, Liac na 3001 e Lanai na 3002 (cada um com o próprio `docker compose`).

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Motion (`LazyMotion`, sempre `m.*`) · lucide-react · Server Actions (formulário).

## Identidade visual (ID VISUAL/)

- Cores: rosé `#DBA4A1`, blush `#F9DAD6`, grafite `#606060`, sálvia `#72928A` → escalas `primary`, `accent`, `ink` em `src/app/globals.css` (`@theme`).
- Fontes do manual: Heading Compressed Pro e Anurati (comerciais). No site: **Antonio** (condensada, títulos em caixa alta) e **Montserrat** (textos e rótulos espaçados).
- Logo: `public/images/marca/logo-liac-eventos-{branco,rose,grafite}.png` (upscale com IA do logo do site antigo, recolorido nas cores do manual). Header usa o branco sobre a foto e o rosé ao rolar.
- Padrão geométrico do manual: `public/images/marca/padrao-geometrico.webp` (utilitário `bg-pattern`) + formas animadas em `components/ui/GeoShape.tsx`.
- Botões com cantos recortados (eco do logo) e preenchimento que atravessa no hover (`btn-liac`).

## Páginas

Home · Nosso espaço · Serviços · Clientes · Sobre nós · Galeria · Perguntas frequentes · Trabalhe conosco · Fale conosco · Política de privacidade · 404.

Regras de layout combinadas: topos centralizados com margem de segurança (rótulo só na home); FAQ é sempre a última seção antes do rodapé; chamadas finais com o padrão geométrico visível + sombra suave.

Home na ordem do wireframe: topo em carrossel (4 fotos, Ken Burns) → faixa de destaques → Nosso espaço → Autoridade em números → Prova social (avaliações) → Por que o Liac → Tour imersivo (vídeo) → Serviços & ocasiões → Galeria (filtros) → Localização (mapa) → FAQ → CTA final.

## Conteúdo e de onde veio

- **Fotos** (`public/images/fotos`, 37 WebP até 2400 px): todas do site antigo (liaceventos.com.br). Todas passaram por realce com IA (Real-ESRGAN misturado ao original, sem efeito "cera"); marcas d'água de fotógrafo ("dois cliques", "Hugo Daniel") foram removidas por recorte/retoque. Em 07/10/2026, as 15 fotos cujo original tem menos resolução que a final (WhatsApp, cerimônias de 1366 px, boates e salão HDR) foram refeitas: Real-ESRGAN no original inteiro (antes era reduzido pela metade), com cor/luz da versão anterior e os cantos retocados preservados. As outras já vêm de originais maiores que a versão do site. As imagens de spa, pub, área kids, banheiros e salão vazio são as imagens de projeto que já estavam no site. Originais em `statics/image/site-antigo`.
- **Vídeo do tour** (`public/videos/tour-liac-eventos.mp4`, 1280 px): vídeo de apresentação do site antigo. Substitui o "tour 360" que era placeholder no wireframe. Só baixa quando a pessoa clica em play.
- **Avaliações** (`src/content/testimonials.ts`): 9 avaliações públicas reais do perfil no Casamentos.com.br (texto original, só correções mínimas de digitação). Nota **4,8 com 10 avaliações** e **mais de 105 casais** conferidos no perfil em 05/10/2026. A nota não vai para o JSON-LD (política do Google).
- **Horário** (seg–sex 9h–17h, sáb 10h–16h), Instagram e "Grupo Let's Go Festas": site antigo.

## SEO / GEO

- Metadata por página (título ≤ ~65, description ≤ 160), canonical, Open Graph com imagem própria por página (`public/images/og`), Twitter.
- JSON-LD: `EventVenue + LocalBusiness` (capacidade, comodidades, ambientes, horário, contato, ações "proposta pelo WhatsApp" e "como chegar", `parentOrganization` Grupo Let's Go), `WebSite`, `WebPage`/`AboutPage`/`ContactPage`/`CollectionPage`, `BreadcrumbList`, `FAQPage`, `ItemList` de serviços, `ImageGallery`.
- `sitemap.xml` com imagens de cada página, `robots.txt` liberando crawlers de IA, `/llms.txt` gerado do conteúdo.
- LGPD: política de privacidade + aviso de cookies com Google Consent Mode v2.
- Lighthouse mobile (produção, out/2026): Acessibilidade, Boas práticas e SEO **100 em todas as páginas**; Performance 76–90; CLS 0.

## Pendências com o cliente

- [ ] Coordenadas do pin no Perfil da Empresa no Google (`site.address.geo`) e link direto do perfil (CID).
- [ ] Razão social e CNPJ (política de privacidade, `site.legal`).
- [ ] Logo em vetor (SVG) e arquivos das fontes do manual, se quiserem as fontes originais no site.
- [ ] Logos de clientes/empresas para a seção "Marcas & parceiros" do wireframe (não publicada sem material real) e fotos de eventos corporativos.
- [ ] Depoimentos em vídeo (o wireframe previa; hoje a prova social usa as avaliações públicas).
- [ ] Tour 360 oficial, se existir (hoje: vídeo do tour).
- [ ] Definir `LEAD_WEBHOOK_URL` (e `CAREERS_WEBHOOK_URL`, se o RH usar outro destino) e `NEXT_PUBLIC_GTM_ID`; após publicar, enviar o sitemap no Search Console.
