export default function extractFirstCharacters(text: string): string {
    if (!text || text.length === 0) {
        return '';
    }

    return text.substring(0, 20);
}

// // Example usage of the function
// const text = "This is a sample text to demonstrate the function.";
// const first16Characters = extractFirstCharacters(text);
// console.log(first16Characters); // Output: "This is a sample"
