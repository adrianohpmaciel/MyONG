/**
 * MyONG - SPA Router
 * Sistema de Single Page Application com History API
 */

(function() {
    'use strict';

    // Configuração das rotas
    const Router = {
        routes: {
            '': 'home',
            '/': 'home',
            'home': 'home',
            'projetos': 'projetos',
            'cadastro': 'cadastro'
        },

        // Inicializa o router
        init: function() {
            // Intercepta cliques em links
            this.interceptLinks();
            
            // Listener para mudanças no hash
            window.addEventListener('hashchange', () => {
                this.handleRoute(this.getHashPath());
            });

            // Carrega rota inicial
            const initialPath = this.getHashPath();
            this.handleRoute(initialPath, false);
        },

        // Obtém o path do hash (sem o #)
        getHashPath: function() {
            const hash = window.location.hash;
            if (!hash || hash === '#' || hash === '#/') {
                return 'home';
            }
            // Remove # e / inicial se houver
            return hash.replace(/^#\/?/, '');
        },

        // Intercepta cliques em links <a> para navegação SPA
        interceptLinks: function() {
            document.addEventListener('click', (event) => {
                const link = event.target.closest('a');
                
                // Verifica se é um link válido para interceptar
                if (!link) return;
                
                const href = link.getAttribute('href');
                
                // Ignora links externos e links especiais
                if (!href || 
                    href.startsWith('http') || 
                    href === '' ||
                    link.hasAttribute('download') ||
                    link.getAttribute('target') === '_blank') {
                    return;
                }

                // Converte links antigos para o formato hash SPA
                let path = '';
                
                if (href === 'index.html' || href === './index.html' || href === '/') {
                    path = '#/';
                } else if (href === 'projetos.html' || href === './projetos.html' || href === '/projetos') {
                    path = '#/projetos';
                } else if (href === 'cadastro.html' || href === './cadastro.html' || href === '/cadastro') {
                    path = '#/cadastro';
                } else if (href.includes('index.html#') || href.includes('#')) {
                    // Links de âncora (ex: #sobre, #contato) - apenas em home
                    if (href.startsWith('#')) {
                        // Ancora na página atual
                        const currentSection = this.getHashPath();
                        if (currentSection !== 'home' && currentSection !== '') {
                            // Se não está em home, vai para home primeiro
                            event.preventDefault();
                            window.location.hash = '#/';
                            setTimeout(() => {
                                const element = document.getElementById(href.substring(1));
                                if (element) {
                                    element.scrollIntoView({ behavior: 'smooth' });
                                }
                            }, 100);
                        }
                        return;
                    } else {
                        // Link com ancora (ex: index.html#sobre)
                        const anchor = href.split('#')[1];
                        event.preventDefault();
                        window.location.hash = '#/';
                        setTimeout(() => {
                            const element = document.getElementById(anchor);
                            if (element) {
                                element.scrollIntoView({ behavior: 'smooth' });
                            }
                        }, 100);
                        return;
                    }
                } else {
                    return;
                }

                // Previne navegação padrão
                event.preventDefault();

                // Navega para a nova rota
                window.location.hash = path;
            });
        },

        // Gerencia mudança de rota
        handleRoute: function(path) {
            // Remove trailing slash
            if (path.endsWith('/')) {
                path = path.slice(0, -1);
            }

            // Se vazio, considera home
            if (!path || path === '') {
                path = 'home';
            }
            
            // Adiciona ao histórico de navegação
            if (window.MyONGStorage) {
                window.MyONGStorage.Navigation.addToHistory(path);
            }

            // Obtém a seção correspondente à rota
            const sectionId = this.routes[path];
            
            // Se rota não existe, redireciona para home
            if (!sectionId) {
                window.location.hash = '#/';
                return;
            }

            // Exibe a seção
            this.showSection(sectionId);
            
            // Rola para o topo
            window.scrollTo({ top: 0, behavior: 'smooth' });
        },

        // Exibe a seção correspondente e oculta as outras
        showSection: function(sectionId) {
            // Lista de todas as seções
            const sections = ['home', 'projetos', 'cadastro'];
            
            sections.forEach(id => {
                const section = document.getElementById(id);
                if (section) {
                    if (id === sectionId) {
                        section.style.display = 'block';
                        section.classList.add('active');
                    } else {
                        section.style.display = 'none';
                        section.classList.remove('active');
                    }
                }
            });

            // Atualiza menu ativo
            this.updateActiveMenu(sectionId);

            // Fecha menu mobile se estiver aberto
            this.closeMobileMenu();
        },

        // Atualiza classe 'active' no menu de navegação
        updateActiveMenu: function(sectionId) {
            const navLinks = document.querySelectorAll('.nav-link');
            const cadastroBtn = document.querySelector('.nav .btn-primary');
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                
                const href = link.getAttribute('href');
                
                // Marca o link correspondente como ativo
                if ((sectionId === 'home' && (href === 'index.html' || href === '/' || href === './' || href === './index.html' || href === '#/')) ||
                    (sectionId === 'projetos' && (href === 'projetos.html' || href === '/projetos' || href === './projetos.html' || href === '#/projetos')) ||
                    (sectionId === 'cadastro' && (href === 'cadastro.html' || href === '/cadastro' || href === './cadastro.html' || href === '#/cadastro'))) {
                    link.classList.add('active');
                }
            });
            
            // Botão Cadastre-se não tem active state mas precisa funcionar
            if (cadastroBtn && sectionId === 'cadastro') {
                cadastroBtn.style.opacity = '0.9';
            } else if (cadastroBtn) {
                cadastroBtn.style.opacity = '1';
            }
        },

        // Fecha o menu mobile
        closeMobileMenu: function() {
            const nav = document.querySelector('.nav');
            const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
            
            if (nav && nav.classList.contains('active')) {
                nav.classList.remove('active');
                if (mobileMenuToggle) {
                    mobileMenuToggle.setAttribute('aria-expanded', 'false');
                }
            }
        }
    };

    // Inicializa o router quando o DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => Router.init());
    } else {
        Router.init();
    }

    // Exporta o Router para uso global se necessário
    window.MyONGRouter = Router;

})();
