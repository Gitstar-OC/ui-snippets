const fs = require("fs");
const path = require("path");

// Configurations
const WORDS_PER_MINUTE = 35; // Typing speed per word
const CHARS_PER_SECOND = (WORDS_PER_MINUTE * 5) / 60; // Roughly 5 characters per word
const DELAY_PER_CHAR = 1000 / CHARS_PER_SECOND;
const DELETE_PERCENTAGE = 0; // 10% of the text will be deleted each time

// Sample text to write, modify as needed
const File =`import { styled } from 'stitches.config';

import snippets from 'components/Snippets';
import ContextMenu from 'components/ContextMenu';
import SnippetsGridItem from './SnippetsGridItem';

const SnippetsGrid = ({ children }) => {
  return (
    <Wrapper>
      {snippets.map(({ Component, tailwindStyling, cssStyling, scssStyling }) => (
        <ContextMenu tailwindStyling={tailwindStyling} cssStyling={cssStyling} scssStyling={scssStyling} key={cssStyling}>
          <SnippetsGridItem>
            <Component />
          </SnippetsGridItem>
        </ContextMenu>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled('div', {
  display: 'grid',
  gap: '$4',

  '@bp2': {
    gridTemplateColumns: '1fr 1fr'
  },

  '@bp3': {
    gridTemplateColumns: 'repeat(4, 1fr)'
  }
});

export default SnippetsGrid;
`



const Text = File.split(""); // Splitting into characters

let isRunning = true;

async function typeEffect(filePath) {
    try {
        let content = ""; // start with an empty content

        while (isRunning) {
            // Simulate typing character by character
            for (const char of Text) {
                if (!isRunning) break;

                content += char;
                fs.writeFileSync(filePath, content); // write to file progressively
                process.stdout.write(char); // display in terminal
                await delay(DELAY_PER_CHAR);
            }

            if (!isRunning) break;

            // Delete a portion of the text once fully typed
            let charsToKeep = Math.floor(content.length * (1 - DELETE_PERCENTAGE));
            content = content.slice(-charsToKeep);
            fs.writeFileSync(filePath, content);
            console.log("\nDeleted a portion of the text...");

            // Wait a bit before starting the next cycle
            await delay(1000);
        }
    } catch (error) {
        console.error("Error during typing effect:", error);
    }
}

// Helper function to create delays
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Start the typing effect
const filePath = path.join(__dirname, "./components/SnippetsGrid/SnippetsGrid.js");
console.log("Starting typing effect... Press CTRL+C to stop.");
typeEffect(filePath);

// Handle graceful exit
process.on("SIGINT", () => {
    console.log("\nStopping typing effect...");
    isRunning = false;
});
