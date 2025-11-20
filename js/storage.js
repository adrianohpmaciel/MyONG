/**
 * ============================================
 * LOCAL STORAGE MANAGER - MyONG Platform
 * Gerenciamento de armazenamento local
 * ============================================
 */

(function() {
  'use strict';

  // ===== STORAGE KEYS =====
  const STORAGE_KEYS = {
    FORM_DRAFT: 'myong_form_draft_',
    USER_PREFERENCES: 'myong_user_preferences',
    NAVIGATION_HISTORY: 'myong_navigation_history',
    FILTER_SETTINGS: 'myong_filter_settings',
    FAVORITE_PROJECTS: 'myong_favorite_projects',
    THEME: 'myong_theme',
    LAST_VISIT: 'myong_last_visit'
  };

  // ===== STORAGE MANAGER =====
  const StorageManager = {
    
    // Verifica se localStorage está disponível
    isAvailable: function() {
      try {
        const test = '__storage_test__';
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
      } catch (e) {
        console.warn('localStorage não está disponível:', e);
        return false;
      }
    },

    // Salva dados no localStorage
    set: function(key, value) {
      if (!this.isAvailable()) return false;
      
      try {
        const data = JSON.stringify(value);
        localStorage.setItem(key, data);
        return true;
      } catch (e) {
        console.error('Erro ao salvar no localStorage:', e);
        return false;
      }
    },

    // Recupera dados do localStorage
    get: function(key, defaultValue = null) {
      if (!this.isAvailable()) return defaultValue;
      
      try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : defaultValue;
      } catch (e) {
        console.error('Erro ao ler do localStorage:', e);
        return defaultValue;
      }
    },

    // Remove item do localStorage
    remove: function(key) {
      if (!this.isAvailable()) return false;
      
      try {
        localStorage.removeItem(key);
        return true;
      } catch (e) {
        console.error('Erro ao remover do localStorage:', e);
        return false;
      }
    },

    // Limpa todos os dados da aplicação
    clear: function() {
      if (!this.isAvailable()) return false;
      
      try {
        Object.values(STORAGE_KEYS).forEach(key => {
          if (key.includes('myong_')) {
            Object.keys(localStorage).forEach(storageKey => {
              if (storageKey.startsWith(key)) {
                localStorage.removeItem(storageKey);
              }
            });
          }
        });
        return true;
      } catch (e) {
        console.error('Erro ao limpar localStorage:', e);
        return false;
      }
    },

    // Verifica tamanho usado no localStorage
    getUsedSpace: function() {
      if (!this.isAvailable()) return 0;
      
      let size = 0;
      for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
          size += localStorage[key].length + key.length;
        }
      }
      return size;
    }
  };

  // ===== FORM DRAFT MANAGER =====
  const FormDraftManager = {
    
    // Salva rascunho do formulário
    saveDraft: function(formId, formData) {
      const key = STORAGE_KEYS.FORM_DRAFT + formId;
      const draft = {
        data: formData,
        timestamp: new Date().toISOString(),
        formId: formId
      };
      
      StorageManager.set(key, draft);
      console.log(`Rascunho do formulário "${formId}" salvo`);
    },

    // Recupera rascunho do formulário
    getDraft: function(formId) {
      const key = STORAGE_KEYS.FORM_DRAFT + formId;
      const draft = StorageManager.get(key);
      
      if (draft) {
        console.log(`Rascunho do formulário "${formId}" recuperado`);
        return draft;
      }
      
      return null;
    },

    // Remove rascunho do formulário
    removeDraft: function(formId) {
      const key = STORAGE_KEYS.FORM_DRAFT + formId;
      StorageManager.remove(key);
      console.log(`Rascunho do formulário "${formId}" removido`);
    },

    // Lista todos os rascunhos salvos
    getAllDrafts: function() {
      const drafts = [];
      const prefix = STORAGE_KEYS.FORM_DRAFT;
      
      for (let key in localStorage) {
        if (key.startsWith(prefix)) {
          const draft = StorageManager.get(key);
          if (draft) drafts.push(draft);
        }
      }
      
      return drafts;
    },

    // Auto-save: salva formulário automaticamente a cada mudança
    setupAutoSave: function(form) {
      if (!form) return;
      
      const formId = form.id || 'form_' + Date.now();
      let saveTimeout;

      // Função para coletar dados do formulário
      const collectFormData = () => {
        const formData = {};
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
          if (input.type === 'password') return; // Não salva senhas
          if (input.type === 'checkbox') {
            formData[input.name || input.id] = input.checked;
          } else if (input.type === 'radio') {
            if (input.checked) {
              formData[input.name || input.id] = input.value;
            }
          } else {
            formData[input.name || input.id] = input.value;
          }
        });
        
        return formData;
      };

      // Salva com debounce de 1 segundo
      const debouncedSave = () => {
        clearTimeout(saveTimeout);
        saveTimeout = setTimeout(() => {
          const formData = collectFormData();
          this.saveDraft(formId, formData);
        }, 1000);
      };

      // Adiciona listeners aos inputs
      const inputs = form.querySelectorAll('input, textarea, select');
      inputs.forEach(input => {
        if (input.type !== 'password') {
          input.addEventListener('input', debouncedSave);
          input.addEventListener('change', debouncedSave);
        }
      });

      // Remove rascunho ao enviar formulário
      form.addEventListener('submit', () => {
        this.removeDraft(formId);
      });

      console.log(`Auto-save configurado para formulário "${formId}"`);
    },

    // Restaura dados do rascunho no formulário
    restoreDraft: function(form) {
      if (!form) return false;
      
      const formId = form.id || 'form_' + Date.now();
      const draft = this.getDraft(formId);
      
      if (!draft || !draft.data) return false;

      // Preenche os campos com os dados salvos
      Object.keys(draft.data).forEach(key => {
        const input = form.querySelector(`[name="${key}"], #${key}`);
        if (!input) return;

        if (input.type === 'checkbox') {
          input.checked = draft.data[key];
        } else if (input.type === 'radio') {
          if (input.value === draft.data[key]) {
            input.checked = true;
          }
        } else {
          input.value = draft.data[key];
        }
      });

      // Mostra mensagem de restauração
      const draftDate = new Date(draft.timestamp);
      const message = `Rascunho restaurado de ${draftDate.toLocaleDateString('pt-BR')} às ${draftDate.toLocaleTimeString('pt-BR')}`;
      
      if (window.showToast) {
        window.showToast('Rascunho Restaurado', message, 'info');
      } else {
        console.log(message);
      }

      return true;
    }
  };

  // ===== USER PREFERENCES MANAGER =====
  const PreferencesManager = {
    
    // Salva preferências do usuário
    savePreferences: function(preferences) {
      const current = this.getPreferences();
      const updated = { ...current, ...preferences };
      StorageManager.set(STORAGE_KEYS.USER_PREFERENCES, updated);
      console.log('Preferências do usuário atualizadas');
    },

    // Recupera preferências do usuário
    getPreferences: function() {
      return StorageManager.get(STORAGE_KEYS.USER_PREFERENCES, {
        theme: 'light',
        notifications: true,
        language: 'pt-BR',
        autoSave: true
      });
    },

    // Atualiza uma preferência específica
    updatePreference: function(key, value) {
      const preferences = this.getPreferences();
      preferences[key] = value;
      this.savePreferences(preferences);
    },

    // Reseta preferências para padrão
    resetPreferences: function() {
      StorageManager.remove(STORAGE_KEYS.USER_PREFERENCES);
      console.log('Preferências resetadas para padrão');
    }
  };

  // ===== NAVIGATION HISTORY MANAGER =====
  const NavigationManager = {
    
    // Adiciona página ao histórico
    addToHistory: function(page) {
      const history = this.getHistory();
      const entry = {
        page: page,
        timestamp: new Date().toISOString(),
        url: window.location.href
      };
      
      history.unshift(entry);
      
      // Mantém apenas os últimos 50 itens
      if (history.length > 50) {
        history.length = 50;
      }
      
      StorageManager.set(STORAGE_KEYS.NAVIGATION_HISTORY, history);
    },

    // Recupera histórico de navegação
    getHistory: function() {
      return StorageManager.get(STORAGE_KEYS.NAVIGATION_HISTORY, []);
    },

    // Limpa histórico
    clearHistory: function() {
      StorageManager.remove(STORAGE_KEYS.NAVIGATION_HISTORY);
      console.log('Histórico de navegação limpo');
    },

    // Obtém páginas mais visitadas
    getMostVisited: function(limit = 5) {
      const history = this.getHistory();
      const pageCount = {};
      
      history.forEach(entry => {
        pageCount[entry.page] = (pageCount[entry.page] || 0) + 1;
      });
      
      return Object.entries(pageCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, limit)
        .map(([page, count]) => ({ page, count }));
    }
  };

  // ===== FILTER SETTINGS MANAGER =====
  const FilterManager = {
    
    // Salva configurações de filtro
    saveFilters: function(filters) {
      StorageManager.set(STORAGE_KEYS.FILTER_SETTINGS, filters);
      console.log('Filtros salvos');
    },

    // Recupera configurações de filtro
    getFilters: function() {
      return StorageManager.get(STORAGE_KEYS.FILTER_SETTINGS, {
        search: '',
        category: '',
        location: ''
      });
    },

    // Limpa filtros
    clearFilters: function() {
      StorageManager.remove(STORAGE_KEYS.FILTER_SETTINGS);
      console.log('Filtros limpos');
    },

    // Aplica filtros salvos
    applyFilters: function() {
      const filters = this.getFilters();
      
      // Aplica nos elementos de filtro
      const searchInput = document.getElementById('search');
      const categorySelect = document.getElementById('category');
      const locationSelect = document.getElementById('location');
      
      if (searchInput && filters.search) searchInput.value = filters.search;
      if (categorySelect && filters.category) categorySelect.value = filters.category;
      if (locationSelect && filters.location) locationSelect.value = filters.location;
      
      console.log('Filtros aplicados');
    }
  };

  // ===== FAVORITE PROJECTS MANAGER =====
  const FavoritesManager = {
    
    // Adiciona projeto aos favoritos
    addFavorite: function(projectId, projectData) {
      const favorites = this.getFavorites();
      
      if (!favorites.find(fav => fav.id === projectId)) {
        favorites.push({
          id: projectId,
          data: projectData,
          addedAt: new Date().toISOString()
        });
        
        StorageManager.set(STORAGE_KEYS.FAVORITE_PROJECTS, favorites);
        console.log(`Projeto ${projectId} adicionado aos favoritos`);
        return true;
      }
      
      return false;
    },

    // Remove projeto dos favoritos
    removeFavorite: function(projectId) {
      const favorites = this.getFavorites();
      const filtered = favorites.filter(fav => fav.id !== projectId);
      
      StorageManager.set(STORAGE_KEYS.FAVORITE_PROJECTS, filtered);
      console.log(`Projeto ${projectId} removido dos favoritos`);
    },

    // Verifica se projeto está nos favoritos
    isFavorite: function(projectId) {
      const favorites = this.getFavorites();
      return favorites.some(fav => fav.id === projectId);
    },

    // Recupera todos os favoritos
    getFavorites: function() {
      return StorageManager.get(STORAGE_KEYS.FAVORITE_PROJECTS, []);
    },

    // Limpa todos os favoritos
    clearFavorites: function() {
      StorageManager.remove(STORAGE_KEYS.FAVORITE_PROJECTS);
      console.log('Favoritos limpos');
    }
  };

  // ===== LAST VISIT TRACKER =====
  const VisitTracker = {
    
    // Registra última visita
    recordVisit: function() {
      const visit = {
        timestamp: new Date().toISOString(),
        page: window.location.href
      };
      
      StorageManager.set(STORAGE_KEYS.LAST_VISIT, visit);
    },

    // Recupera última visita
    getLastVisit: function() {
      return StorageManager.get(STORAGE_KEYS.LAST_VISIT);
    },

    // Verifica se é primeira visita
    isFirstVisit: function() {
      return !this.getLastVisit();
    },

    // Calcula dias desde última visita
    daysSinceLastVisit: function() {
      const lastVisit = this.getLastVisit();
      if (!lastVisit) return null;
      
      const lastDate = new Date(lastVisit.timestamp);
      const now = new Date();
      const diffTime = Math.abs(now - lastDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      return diffDays;
    }
  };

  // ===== INICIALIZAÇÃO =====
  
  // Registra visita
  VisitTracker.recordVisit();

  // Mostra mensagem de boas-vindas para primeira visita
  if (VisitTracker.isFirstVisit()) {
    console.log('%cBem-vindo ao MyONG! 🎉', 'color: #2E8B57; font-size: 16px; font-weight: bold;');
  } else {
    const days = VisitTracker.daysSinceLastVisit();
    if (days > 0) {
      console.log(`Última visita há ${days} dia(s)`);
    }
  }

  // Verifica espaço usado
  const usedSpace = StorageManager.getUsedSpace();
  const usedKB = (usedSpace / 1024).toFixed(2);
  console.log(`Armazenamento local usado: ${usedKB} KB`);

  // ===== EXPORTA PARA USO GLOBAL =====
  window.MyONGStorage = {
    Storage: StorageManager,
    FormDraft: FormDraftManager,
    Preferences: PreferencesManager,
    Navigation: NavigationManager,
    Filters: FilterManager,
    Favorites: FavoritesManager,
    Visit: VisitTracker,
    KEYS: STORAGE_KEYS
  };

  // ===== CONSOLE MESSAGE =====
  console.log('%cLocal Storage Manager Initialized', 'color: #2E8B57; font-weight: bold;');
  console.log('%cFuncionalidades disponíveis:', 'color: #666; font-weight: bold;');
  console.log('  • Auto-save de formulários');
  console.log('  • Preferências do usuário');
  console.log('  • Histórico de navegação');
  console.log('  • Cache de filtros');
  console.log('  • Projetos favoritos');
  console.log('  • Rastreamento de visitas');

})();
