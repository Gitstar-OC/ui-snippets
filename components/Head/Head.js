import NextHead from 'next/head';

const ogImage = 'https://snippets.theme-verse.com/thumbnail.jpg';

const Head = ({
  title = 'UI Snippets',
  description = 'A collection of UI Snippets',
  image = ogImage,
  children
}) => (
  <NextHead>
    {/* Title */}
    <title>{title}</title>
    <meta name="og:title" content={title} />

    {/* Description */}
    <meta name="description" content={description} />
    <meta name="og:description" content={description} />

    {/* Image */}
    <meta name="twitter:image" content={ogImage} />
    <meta name="og:image" content={ogImage} />

    {/* URL */}
    <meta name="og:url" content="https://snippets.theme-verse.com/" />

    {/* General */}
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta httpEquiv="Content-Language" content="en" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@IamNotOC" />
    <meta name="author" content="Emil Kowalski" />

    {/* Favicons */}
    <meta name="msapplication-TileColor" content="#847EE2" />
    <meta name="theme-color" content="#847EE2" />
    <link rel="shortcut icon" href="favicon.ico" />
    <link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png" />
    {children}
  </NextHead>
);

export default Head;
