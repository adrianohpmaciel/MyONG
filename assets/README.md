# Assets - Recursos Adicionais

Esta pasta contém recursos adicionais do projeto MyONG.

## Estrutura

- **docs/** - Documentos e arquivos PDF
- **fonts/** - Fontes customizadas

## Fontes (fonts/)

Caso deseje utilizar fontes customizadas:

1. Adicione os arquivos de fonte (.woff, .woff2, .ttf)
2. Declare no CSS usando @font-face
3. Certifique-se de ter licença para uso web

Exemplo de @font-face:

```css
@font-face {
  font-family: 'MinhaFonte';
  src: url('../assets/fonts/MinhaFonte.woff2') format('woff2'),
       url('../assets/fonts/MinhaFonte.woff') format('woff');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}
```

## Documentos (docs/)

Documentos úteis para o projeto:

- Termos de uso
- Política de privacidade
- Manual do usuário
- Guias de contribuição
- Apresentações

---

**Nota**: Estes recursos são opcionais e podem ser adicionados conforme a necessidade do projeto.
