interface SchemaMarkupProps {
  schema: object | object[];
}

export default function SchemaMarkup({ schema }: SchemaMarkupProps) {
  const schemaArray = Array.isArray(schema) ? schema : [schema];
  
  return (
    <>
      {schemaArray.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(item)
          }}
        />
      ))}
    </>
  );
}
