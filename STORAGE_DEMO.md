# 💾 Demonstração de Armazenamento Local - MyONG

## Funcionalidades Implementadas

### 1. Auto-Save de Formulários ✅

**Como funciona:**
- Salvamento automático a cada 1 segundo após digitar
- Dados persistem mesmo após fechar o navegador
- Confirmação de restauração ao reabrir a página

**Como testar:**
1. Acesse a página de cadastro (`#/cadastro`)
2. Preencha alguns campos do formulário
3. Feche o navegador (ou aba)
4. Reabra a página
5. Um popup perguntará se deseja restaurar o rascunho
6. Clique em "OK" para restaurar os dados

**API utilizada:**
```javascript
// Configurar auto-save
window.MyONGStorage.FormDraft.setupAutoSave(form);

// Restaurar rascunho
window.MyONGStorage.FormDraft.restoreDraft(form);

// Remover rascunho
window.MyONGStorage.FormDraft.removeDraft(formId);
```

---

### 2. Cache de Filtros de Projetos ✅

**Como funciona:**
- Salva automaticamente filtros aplicados (busca, categoria, localização)
- Restaura filtros ao retornar à página de projetos
- Facilita retomar buscas anteriores

**Como testar:**
1. Acesse a página de projetos (`#/projetos`)
2. Aplique filtros (ex: categoria "Educação", localização "São Paulo")
3. Navegue para outra página
4. Retorne para projetos
5. Os filtros estarão restaurados automaticamente

**API utilizada:**
```javascript
// Salvar filtros
window.MyONGStorage.Filters.saveFilters({
  search: 'educação',
  category: 'educacao',
  location: 'sao-paulo'
});

// Recuperar filtros
const filters = window.MyONGStorage.Filters.getFilters();

// Aplicar filtros salvos
window.MyONGStorage.Filters.applyFilters();
```

---

### 3. Histórico de Navegação ✅

**Como funciona:**
- Registra cada página visitada com timestamp
- Mantém os últimos 50 itens de navegação
- Útil para análise de comportamento do usuário

**Como testar:**
1. Navegue entre diferentes seções do site
2. Abra o Console do navegador (F12)
3. Digite: `window.MyONGStorage.Navigation.getHistory()`
4. Veja o histórico completo de navegação

**API utilizada:**
```javascript
// Adicionar ao histórico
window.MyONGStorage.Navigation.addToHistory('projetos');

// Obter histórico
const history = window.MyONGStorage.Navigation.getHistory();

// Páginas mais visitadas
const topPages = window.MyONGStorage.Navigation.getMostVisited(5);

// Limpar histórico
window.MyONGStorage.Navigation.clearHistory();
```

---

### 4. Projetos Favoritos ✅

**Como funciona:**
- Permite marcar projetos como favoritos
- Lista persistente de projetos salvos
- Fácil acesso aos projetos de interesse

**Como testar (via Console):**
```javascript
// Adicionar aos favoritos
window.MyONGStorage.Favorites.addFavorite('projeto-1', {
  nome: 'Escola Solidária',
  categoria: 'Educação'
});

// Listar favoritos
const favoritos = window.MyONGStorage.Favorites.getFavorites();
console.log(favoritos);

// Verificar se é favorito
const isFav = window.MyONGStorage.Favorites.isFavorite('projeto-1');

// Remover dos favoritos
window.MyONGStorage.Favorites.removeFavorite('projeto-1');
```

---

### 5. Preferências do Usuário ✅

**Como funciona:**
- Salva configurações personalizadas
- Tema, notificações, idioma, auto-save, etc.
- Persistem entre sessões

**Como testar (via Console):**
```javascript
// Obter preferências
const prefs = window.MyONGStorage.Preferences.getPreferences();
console.log(prefs);

// Atualizar preferência específica
window.MyONGStorage.Preferences.updatePreference('theme', 'dark');
window.MyONGStorage.Preferences.updatePreference('notifications', false);

// Salvar múltiplas preferências
window.MyONGStorage.Preferences.savePreferences({
  theme: 'dark',
  notifications: false,
  language: 'en-US'
});

// Resetar para padrão
window.MyONGStorage.Preferences.resetPreferences();
```

---

### 6. Rastreamento de Visitas ✅

**Como funciona:**
- Registra data/hora de cada visita
- Calcula dias desde última visita
- Detecta primeira visita do usuário

**Como testar (via Console):**
```javascript
// Verificar última visita
const lastVisit = window.MyONGStorage.Visit.getLastVisit();
console.log(lastVisit);

// Verificar se é primeira visita
const isFirst = window.MyONGStorage.Visit.isFirstVisit();
console.log('Primeira visita?', isFirst);

// Dias desde última visita
const days = window.MyONGStorage.Visit.daysSinceLastVisit();
console.log(`Última visita há ${days} dia(s)`);
```

---

## 🧪 Testes Completos

### Teste 1: Auto-Save de Formulário
```
1. Abra #/cadastro
2. Preencha: Nome, E-mail, Telefone
3. Aguarde 2 segundos (auto-save ativo)
4. Feche o navegador completamente
5. Reabra #/cadastro
6. Popup deve aparecer perguntando sobre restauração
7. Clique "OK" - campos devem estar preenchidos
```

### Teste 2: Persistência de Filtros
```
1. Abra #/projetos
2. Digite na busca: "educação"
3. Selecione categoria: "Educação"
4. Navegue para #/ (home)
5. Volte para #/projetos
6. Filtros devem estar aplicados automaticamente
```

### Teste 3: Histórico de Navegação
```
1. Navegue: Home → Projetos → Cadastro → Home
2. Abra Console (F12)
3. Digite: window.MyONGStorage.Navigation.getHistory()
4. Deve mostrar array com 4 entradas e timestamps
```

### Teste 4: Verificar Espaço Usado
```javascript
// Console
const usedSpace = window.MyONGStorage.Storage.getUsedSpace();
const usedKB = (usedSpace / 1024).toFixed(2);
console.log(`Armazenamento usado: ${usedKB} KB`);
```

### Teste 5: Limpar Todos os Dados
```javascript
// Console - CUIDADO: Remove todos os dados!
window.MyONGStorage.Storage.clear();
console.log('Todos os dados do MyONG foram limpos');
```

---

## 🔑 API Completa - Referência Rápida

### StorageManager (Base)
- `Storage.isAvailable()` - Verifica disponibilidade
- `Storage.set(key, value)` - Salva dados
- `Storage.get(key, defaultValue)` - Recupera dados
- `Storage.remove(key)` - Remove item
- `Storage.clear()` - Limpa tudo
- `Storage.getUsedSpace()` - Espaço usado em bytes

### FormDraftManager
- `FormDraft.saveDraft(formId, data)` - Salva rascunho
- `FormDraft.getDraft(formId)` - Recupera rascunho
- `FormDraft.removeDraft(formId)` - Remove rascunho
- `FormDraft.getAllDrafts()` - Lista todos
- `FormDraft.setupAutoSave(form)` - Configura auto-save
- `FormDraft.restoreDraft(form)` - Restaura no formulário

### PreferencesManager
- `Preferences.savePreferences(prefs)` - Salva múltiplas
- `Preferences.getPreferences()` - Recupera todas
- `Preferences.updatePreference(key, value)` - Atualiza uma
- `Preferences.resetPreferences()` - Reseta para padrão

### NavigationManager
- `Navigation.addToHistory(page)` - Adiciona ao histórico
- `Navigation.getHistory()` - Recupera histórico
- `Navigation.clearHistory()` - Limpa histórico
- `Navigation.getMostVisited(limit)` - Top páginas

### FilterManager
- `Filters.saveFilters(filters)` - Salva filtros
- `Filters.getFilters()` - Recupera filtros
- `Filters.clearFilters()` - Limpa filtros
- `Filters.applyFilters()` - Aplica no DOM

### FavoritesManager
- `Favorites.addFavorite(id, data)` - Adiciona favorito
- `Favorites.removeFavorite(id)` - Remove favorito
- `Favorites.isFavorite(id)` - Verifica se é favorito
- `Favorites.getFavorites()` - Lista todos
- `Favorites.clearFavorites()` - Limpa todos

### VisitTracker
- `Visit.recordVisit()` - Registra visita (automático)
- `Visit.getLastVisit()` - Última visita
- `Visit.isFirstVisit()` - Verifica primeira visita
- `Visit.daysSinceLastVisit()` - Dias desde última visita

---

## 🎓 Requisitos Atendidos

### ✅ Especificações Técnicas Obrigatórias

**1. Manipulação do DOM:**
- ✅ Sistema SPA básico implementado (`app.js`)
- ✅ Sistema de templates JavaScript
- ✅ Navegação dinâmica sem reload

**2. Armazenamento Local:**
- ✅ LocalStorage API completa
- ✅ Persistência de dados de formulários
- ✅ Cache de preferências e filtros
- ✅ Histórico de navegação

**3. Validação de Formulários:**
- ✅ Sistema de verificação de consistência
- ✅ Avisos de preenchimento incorreto
- ✅ Feedback visual em tempo real

**4. Código Modular:**
- ✅ 5 arquivos JavaScript organizados
- ✅ Separação por funcionalidade
- ✅ IIFEs para encapsulamento

---

## 📦 Chaves de Armazenamento

Todas as chaves usadas no localStorage:
```
myong_form_draft_{formId}      - Rascunhos de formulários
myong_user_preferences          - Preferências do usuário
myong_navigation_history        - Histórico de navegação
myong_filter_settings           - Configurações de filtros
myong_favorite_projects         - Projetos favoritos
myong_theme                     - Tema da interface
myong_last_visit                - Última visita registrada
```

---

## 🔍 Inspeção no DevTools

Para visualizar os dados no navegador:

**Chrome/Edge:**
1. F12 → Application → Local Storage
2. Expanda `file://` ou o domínio do site
3. Veja todas as chaves `myong_*`

**Firefox:**
1. F12 → Storage → Local Storage
2. Clique no domínio
3. Visualize os dados salvos

---

## ⚠️ Considerações de Segurança

- ✅ Senhas **NÃO** são salvas no localStorage
- ✅ Dados sensíveis devem ser tratados no backend
- ✅ localStorage é visível no navegador (não criptografado)
- ✅ Ideal para preferências, cache e dados não-sensíveis

---

## 🚀 Próximas Melhorias Possíveis

1. **Sincronização em Nuvem** - Backend para sincronizar entre dispositivos
2. **Criptografia de Dados** - Para informações mais sensíveis
3. **IndexedDB** - Para armazenamento de maior volume
4. **Service Worker** - Para funcionalidade offline completa
5. **Export/Import** - Backup de preferências e favoritos

---

**Desenvolvido por:** Adriano Maciel  
**Data:** 19/Novembro/2025  
**Versão:** 1.0.0
