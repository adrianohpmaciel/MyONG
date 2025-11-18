# MyONG - Plataforma de Conexão entre ONGs e Voluntários

![MyONG](https://img.shields.io/badge/Version-1.0.0-2E8B57)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## 📋 Sobre o Projeto

**MyONG** é uma plataforma web desenvolvida para conectar Organizações Não Governamentais (ONGs) com pessoas dispostas a fazer a diferença no mundo através do voluntariado e doações. O projeto visa facilitar o encontro entre causas sociais e pessoas engajadas, promovendo transparência e impacto social.

### 🎯 Objetivos

- Conectar ONGs com voluntários e doadores
- Facilitar a divulgação de projetos sociais
- Promover transparência nas ações do terceiro setor
- Aumentar o engajamento social através da tecnologia

## 🚀 Tecnologias Utilizadas

### Front-end
- **HTML5** - Estrutura semântica e acessível
- **CSS3** - Estilização moderna e responsiva
- **JavaScript (Vanilla)** - Funcionalidades interativas sem frameworks

### Recursos Implementados
- Design responsivo (Mobile-first)
- Validação de formulários em tempo real
- Máscaras para campos de entrada (CPF, CNPJ, telefone, CEP)
- Integração com API ViaCEP para preenchimento automático de endereço
- Animações suaves e transições
- Acessibilidade (ARIA labels, navegação por teclado)
- SEO otimizado

## 📁 Estrutura do Projeto

```
MyONG/
├── index.html                 # Página principal
├── projetos.html             # Listagem de projetos
├── cadastro.html             # Formulários de cadastro
├── css/
│   ├── style.css            # Estilos principais
│   ├── responsive.css       # Media queries
│   └── variables.css        # Variáveis CSS
├── js/
│   ├── main.js              # Funcionalidades gerais
│   ├── form-validation.js   # Validação de formulários
│   └── masks.js             # Máscaras de entrada
├── images/
│   ├── logo.png
│   ├── hero-banner.jpg
│   └── icons/
│       ├── search.svg
│       ├── volunteer.svg
│       ├── donate.svg
│       ├── facebook.svg
│       ├── instagram.svg
│       ├── linkedin.svg
│       └── twitter.svg
├── assets/
│   ├── docs/                # Documentos
│   └── fonts/               # Fontes customizadas
└── README.md
```

## 🎨 Paleta de Cores

A paleta de cores foi cuidadosamente escolhida para representar os valores do terceiro setor:

| Cor | Código HEX | Significado |
|-----|-----------|-------------|
| Verde Floresta | `#2E8B57` | Sustentabilidade e crescimento |
| Laranja | `#FF6B35` | Energia e ação social |
| Azul Escuro | `#2C3E50` | Profissionalismo e confiança |
| Cinza Claro | `#F8F9FA` | Clareza e transparência |
| Texto Principal | `#333333` | Legibilidade |

## 🛠️ Instalação e Configuração

### Pré-requisitos

- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Editor de código (VS Code, Sublime Text, etc.) - opcional
- Servidor web local (Live Server, XAMPP, etc.) - opcional

### Instalação

1. **Clone o repositório**
```powershell
git clone https://github.com/adrianohpmaciel/MyONG.git
```

2. **Navegue até o diretório do projeto**
```powershell
cd MyONG
```

3. **Abra o projeto**
   - **Opção 1**: Abra o arquivo `index.html` diretamente no navegador
   - **Opção 2**: Use o Live Server do VS Code
     - Instale a extensão "Live Server"
     - Clique com o botão direito em `index.html`
     - Selecione "Open with Live Server"

### Estrutura de Desenvolvimento

```powershell
# Para desenvolvimento, você pode usar:
# 1. Live Server (VS Code Extension)
# 2. Python Simple HTTP Server
python -m http.server 8000

# 3. Node.js http-server
npx http-server
```

## 📱 Funcionalidades

### Página Principal (index.html)
- Hero section com chamada para ação
- Cards de funcionalidades
- Estatísticas da plataforma
- Formulário de contato
- Footer com informações e links

### Página de Projetos (projetos.html)
- Sistema de filtros (busca, categoria, localização)
- Cards de projetos com informações detalhadas
- Barra de progresso de arrecadação
- Paginação
- Botões de ação (Doar e Ser Voluntário)

### Página de Cadastro (cadastro.html)
- Toggle entre cadastro de Voluntário e ONG
- Formulários completos e validados
- Máscaras automáticas para campos específicos
- Validação em tempo real
- Integração com ViaCEP

## ✅ Validações Implementadas

### Validações de Campo
- ✓ CPF (com validação de dígitos verificadores)
- ✓ CNPJ (com validação de dígitos verificadores)
- ✓ E-mail (formato válido)
- ✓ Telefone (formato brasileiro)
- ✓ CEP (formato brasileiro)
- ✓ Data de nascimento (idade mínima)
- ✓ Senhas (mínimo de caracteres e confirmação)
- ✓ Campos obrigatórios

### Máscaras de Entrada
- CPF: `000.000.000-00`
- CNPJ: `00.000.000/0000-00`
- Telefone: `(00) 00000-0000`
- CEP: `00000-000`

## 🎯 Responsividade

O projeto foi desenvolvido com abordagem **Mobile-first** e é totalmente responsivo:

- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px - 1439px
- **Large Desktop**: 1440px+

## ♿ Acessibilidade

O projeto segue as diretrizes WCAG 2.1:

- Estrutura semântica HTML5
- ARIA labels e roles
- Navegação por teclado
- Contraste adequado de cores
- Textos alternativos para imagens
- Foco visível em elementos interativos

## 🔍 SEO

Otimizações implementadas:

- Meta tags descritivas
- Open Graph tags (redes sociais)
- Twitter Card tags
- Estrutura semântica
- URLs amigáveis
- Performance otimizada

## 📊 Performance

- CSS minificado (produção)
- JavaScript otimizado
- Lazy loading de imagens
- Animações com CSS
- Transições suaves

## 🤝 Como Contribuir

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📝 Roadmap

### Fase 2 (Planejado)
- [ ] Backend com Node.js
- [ ] Banco de dados MySQL/PostgreSQL
- [ ] Sistema de autenticação
- [ ] Dashboard para ONGs
- [ ] Sistema de doações online
- [ ] Chat entre voluntários e ONGs
- [ ] Sistema de notificações
- [ ] Geolocalização de projetos

### Fase 3 (Futuro)
- [ ] Aplicativo mobile (React Native)
- [ ] Sistema de gamificação
- [ ] Certificados digitais para voluntários
- [ ] Integração com redes sociais
- [ ] Sistema de avaliações
- [ ] Blog integrado

## 🐛 Problemas Conhecidos

Atualmente não há problemas conhecidos. Se encontrar algum bug, por favor [abra uma issue](https://github.com/adrianohpmaciel/MyONG/issues).

## 📄 Licença

- A ser criada

## 👥 Autor

**Adriano Maciel**
- GitHub: [@adrianohpmaciel](https://github.com/adrianohpmaciel)
- LinkedIn: [Adriano Maciel](https://linkedin.com/in/adrianohpmaciel)

## 🙏 Agradecimentos

- Comunidade open source
- Desenvolvedores que contribuem para projetos sociais
- ONGs que inspiraram este projeto

## 📞 Contato 

Para dúvidas, sugestões ou parcerias:

- A ser definido

---

**⭐ Se este projeto foi útil para você, considere dar uma estrela no repositório!**

---

*Desenvolvido com ❤️ para o terceiro setor*
