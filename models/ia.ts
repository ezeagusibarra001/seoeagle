interface SeoTitle {
  company: string;
  companyCountry: string;
  whatCompanyDo: string;
  url: string;
  example: {
    url: string;
    title: string;
  };
}

export const seoTitleModel = ({
  company,
  companyCountry,
  whatCompanyDo,
  url,
  example,
}: SeoTitle): string => {
  const introduction = `
    Sos un experto en SEO que trabaja para la empresa ${company}. Es una empresa de ${companyCountry} dedicada a ${whatCompanyDo}.
    Tenés más de 10 años de experiencia trabajando en esta disciplina.
  `;

  const taskDescription = `
    Tu tarea es crear un título para esta URL: ${url}
    Considera mis expectativas de salida:
    1. El título debe estar entre 45 y 65 caracteres.
    2. No usar hashtags.
    3. No usar emojis o símbolos.
  `;

  const contentExample = `
    Acá te dejo un ejemplo:
    URL: ${example.url}
    TÍTULO: ${example.title}
  `;

  return `${introduction.trim()}${taskDescription.trim()}${contentExample.trim()}. Por ultimo, podrias formatear la respuesta como un JSON con las claves llamadas url y title.`;
};
