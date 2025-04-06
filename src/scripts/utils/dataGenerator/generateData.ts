import { writeFileSync } from "fs";
import { Property } from "../types";
import { generateProperty } from "./generator.js";

export function generateData(): void {
    const properties: Property[] = [];
    for (let i = 1; i < 19; i++) {
        properties.push(generateProperty(i));
    }

    const jsonData = JSON.stringify(properties);

    writeFileSync("./public/data.json", jsonData);

    console.log("Successfully generated properties.json!");
}
generateData();
