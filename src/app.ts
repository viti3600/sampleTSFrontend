/**
 * Represents a visitor for TypeScript types.
 */
interface TypeVisitor {
  visit(type: string): any;
}

/**
* Converts a TypeScript type definition to an object literal.
* @param typeDefinition The TypeScript type definition as a string.
* @param visitor The type visitor to use for conversion.
* @returns An object literal representing the type.
*/
function convertToObject(typeDefinition: string, visitor: TypeVisitor): any {
  return visitor.visit(typeDefinition);
}

// Example usage:
const myTypeDefinition = `"type MyType = { Button = {variant: "solid" | "text"}};"`


// Define a visitor that handles object types
const objectTypeVisitor: TypeVisitor = {
  visit(type: string): any {
      // Assuming the type definition is well-formed
      const typeWithoutBraces = type.substring(type.indexOf("{") + 1, type.lastIndexOf("}"));
      const properties = typeWithoutBraces.split(";").map((prop) => prop.trim());

      const objLiteral: Record<string, any> = {};
      properties.forEach((property) => {
          const [key, value] = property.split(":").map((part) => part.trim());
          objLiteral[key] = value;
      });

      return objLiteral;
  },
};

// Convert the type definition to an object literal
const result = convertToObject(myTypeDefinition, objectTypeVisitor);
console.log(result); // { name: 'string', age: 'number' }
