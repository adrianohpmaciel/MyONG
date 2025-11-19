# MyONG - Plataforma para Organizações Não Governamentais

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Assets](https://img.shields.io/badge/PNG+SVG-Híbrido-FFB13B?style=for-the-badge&logo=image&logoColor=black)
![Responsive](https://img.shields.io/badge/Responsive-Mobile%20First-00C7B7?style=for-the-badge)
![Offline](https://img.shields.io/badge/100%25-Offline-4CAF50?style=for-the-badge)

## 📋 Sobre o Projeto

Plataforma web completa desenvolvida para ONGs gerenciarem suas atividades, divulgar projetos, captar recursos e engajar voluntários. Uma solução digital profissional para o terceiro setor brasileiro.

## 🚀 Funcionalidades

- **Página Institucional** - Apresentação da organização, missão e estatísticas de impacto
- **Gestão de Projetos** - Divulgação de 6 projetos sociais com sistema de filtros
- **Portal de Voluntários** - Cadastro dual (Voluntário/ONG) com validações completas
- **Sistema de Doações** - Barras de progresso e metas de arrecadação
- **Design Responsivo** - Mobile-first com breakpoints otimizados
- **100% Offline** - SVGs inline, sem dependências externas de imagens
- **Acessibilidade** - ARIA labels, navegação por teclado, contraste adequado

## 🛠️ Tecnologias

- **HTML5 Semântico** - Estrutura acessível e bem organizada
- **CSS3 Avançado** - Grid, Flexbox, CSS Variables, Gradientes
- **JavaScript Vanilla** - Sem dependências externas
- **Assets Híbridos** - Logo PNG + Ícones SVG inline
- **Design System Customizado** - Paleta de cores e componentes reutilizáveis
- **Validações HTML5 + JavaScript** - Formulários com feedback em tempo real
- **Máscaras de Input** - CPF, telefone, CEP formatados automaticamente

## 📁 Estrutura do Projeto

```
myong/
├── index.html          # Página inicial
├── projetos.html       # Projetos e voluntariado
├── cadastro.html       # Formulário de cadastro
├── css/                # Estilos e design system
│   ├── variables.css
│   ├── style.css
│   └── responsive.css
├── js/                 # Interatividade e validações
│   ├── main.js
│   ├── form-validation.js
│   └── masks.js
├── images/             # Assets visuais
│   ├── logo.png        # Logo oficial PNG
│   └── icons/          # Ícones adicionais
└── README.md
```

## 🔧 Como Executar

1. Clone o repositório:
```bash
git clone https://github.com/adrianohpmaciel/MyONG.git
```

2. Acesse a pasta do projeto:
```bash
cd MyONG
```

3. Abra o arquivo `index.html` em seu navegador
   - **Método 1**: Duplo clique no arquivo `index.html`
   - **Método 2**: Arraste o arquivo para o navegador
   - **Método 3**: Use Live Server no VS Code

## 📱 Páginas Implementadas

### 🏠 Home (`index.html`)
- Hero section com gradiente verde
- Cards de funcionalidades com ícones SVG
- Estatísticas de impacto (ONGs, voluntários, projetos)
- Seção de contato com formulário

### 📂 Projetos (`projetos.html`)
- Sistema de filtros (busca, categoria, localização)
- 6 projetos sociais com imagens SVG coloridas
- Barras de progresso para metas de arrecadação
- Badges de categorias (Educação, Saúde, Meio Ambiente, etc.)
- Botões de ação (Doar, Ser Voluntário)

### 📝 Cadastro (`cadastro.html`)
- Formulário dual: Voluntário ou ONG
- Validações em tempo real (CPF, CNPJ, e-mail)
- Máscaras automáticas (CPF, telefone, CEP)
- Integração com API ViaCEP
- Agrupamento lógico com fieldsets
- Mensagens de erro contextuais

## ⚙️ Destaques Técnicos

### Validações de Formulário
- **CPF**: Algoritmo completo de validação com dígitos verificadores
- **CNPJ**: Validação empresarial para cadastro de ONGs
- **E-mail**: Regex otimizado para formato correto
- **CEP**: Integração com API ViaCEP para preenchimento automático
- **Telefone**: Máscara adaptativa (celular/fixo)

### JavaScript Modular
```
js/
├── main.js              # Menu mobile, scroll suave, animações
├── form-validation.js   # Validações complexas de CPF/CNPJ
└── masks.js             # Máscaras automáticas de input
```

### CSS Organizado
```
css/
├── variables.css        # Design tokens (cores, espaçamentos, tipografia)
├── style.css            # Estilos principais e componentes
└── responsive.css       # Media queries e breakpoints
```

### Boas Práticas Implementadas
- ✅ Semântica HTML5 completa
- ✅ Acessibilidade WCAG 2.1
- ✅ SEO otimizado (meta tags, Open Graph)
- ✅ Mobile-first responsive design
- ✅ Performance otimizada (CSS inline crítico)
- ✅ Código limpo e comentado
- ✅ Sem dependências externas

## 🎨 Características Visuais

### Elementos Gráficos
Abordagem híbrida otimizada:
- 🖼️ **Logo Real** - Arquivo PNG profissional (`images/logo.png`)
- ⚡ **Ícones SVG Inline** - Feather Icons embutidos no HTML
- 🎨 **Imagens de Projetos** - SVG inline coloridos por categoria


### Paleta de Cores
- **Verde Primário** (#4CAF50) - Logo, CTAs, links
- **Azul** (#2196F3) - Educação, busca
- **Vermelho** (#F44336) - Saúde
- **Laranja** (#FF9800) - Proteção Animal, voluntariado
- **Roxo** (#9C27B0) - Cultura
- **Rosa** (#E91E63) - Direitos Humanos

### Componentes
- Logo PNG real (50x50px), criada utilizando IA (chatGPT versão de navegador)
- Favicon usando o mesmo logo
- Hero background com gradiente CSS
- Ícones Feather Icons inline (busca, pessoas, coração)
- Cards de projetos com SVG colorido

## 🌐 Demonstração Online

🔗 **Acesse o projeto publicado:** [https://adrianohpmaciel.github.io/MyONG/index.html](https://adrianohpmaciel.github.io/MyONG/index.html)

### Navegação Rápida
- 🏠 [Página Inicial](https://adrianohpmaciel.github.io/MyONG/index.html)
- 📂 [Projetos Sociais](https://adrianohpmaciel.github.io/MyONG/projetos.html)
- 📝 [Cadastro](https://adrianohpmaciel.github.io/MyONG/cadastro.html)

## 📊 Métricas do Projeto

- **3 páginas HTML** completas e semânticas
- **928 linhas** de CSS otimizado
- **6 projetos sociais** demonstrativos
- **0 dependências** externas
- **100% offline** após primeiro carregamento
- **Mobile-first** com 4 breakpoints responsivos

## 🤖 Metodologia de Desenvolvimento

Este projeto foi desenvolvido utilizando **ferramentas de IA como assistente de desenvolvimento**, seguindo as melhores práticas da engenharia de software moderna. A abordagem combinou:

### Aprendizado Ativo
- Estudo dos conceitos de HTML5, CSS3 e JavaScript através de documentação oficial
- Compreensão profunda dos requisitos do projeto e das necessidades do terceiro setor
- Análise crítica de cada componente implementado

### Desenvolvimento Assistido
- Utilização de IA para **acelerar a implementação** de componentes repetitivos
- Auxílio na **estruturação do código** seguindo padrões semânticos e de acessibilidade
- Suporte na **documentação técnica** e comentários explicativos

### Validação e Refinamento
- **Revisão manual** de todo código gerado
- **Testes funcionais** em múltiplos navegadores e dispositivos
- **Ajustes personalizados** para atender requisitos específicos do projeto
- **Compreensão total** da arquitetura e funcionamento de cada funcionalidade

### Competências Desenvolvidas
Mesmo com auxílio de IA, o projeto demonstra domínio de:
- ✅ Estruturação semântica HTML5
- ✅ Estilização avançada com CSS3
- ✅ Lógica de programação JavaScript
- ✅ Design responsivo e acessível
- ✅ Validação de formulários complexos
- ✅ Integração com APIs externas (ViaCEP)
- ✅ Versionamento de código (Git/GitHub)

> **Transparência Acadêmica:** O uso de ferramentas de IA no desenvolvimento de software é uma prática profissional moderna e aceita na indústria. Este projeto reflete a capacidade de utilizar tecnologias contemporâneas de forma ética e produtiva, mantendo a responsabilidade e compreensão integral do código produzido.

## 📝 Licença

Este é um projeto educacional desenvolvido para fins acadêmicos e de aprendizado.

## 👨‍💻 Autor

**Adriano Maciel**
- GitHub: [@adrianohpmaciel](https://github.com/adrianohpmaciel)
- Repositório: [MyONG](https://github.com/adrianohpmaciel/MyONG)

---

**💚 Desenvolvido com foco em impacto social positivo**

*Projeto criado para a disciplina de Desenvolvimento Front-End, aplicando HTML5, CSS3 e JavaScript em um contexto socialmente relevante.*
