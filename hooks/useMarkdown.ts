import { useState, useEffect } from 'react';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeSanitize from 'rehype-sanitize';

// Definisci il tipo di ritorno della funzione useMarkdown
export function useMarkdown(markdownText: string): string {
  const [contentHtml, setContentHtml] = useState<string>('');

  useEffect(() => {
    const processMarkdown = async () => {
      const result = await unified()
        .use(remarkParse) // Converti il markdown in AST
        .use(remarkRehype) // Passa da markdown ad HTML (AST)
        .use(rehypeSanitize) // Sanifica l'HTML
        .use(rehypeStringify) // Converti l'HTML AST in stringa
        .process(markdownText); // Processa il testo markdown fornito

      setContentHtml(result.toString());
    };

    processMarkdown();
  }, [markdownText]); // Riesegui questo effetto se il testo markdown cambia

  return contentHtml;
}
