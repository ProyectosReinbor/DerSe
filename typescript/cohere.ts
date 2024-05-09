// import { CohereClient } from "cohere-ai";
// const cohere = new CohereClient({
//     token: "gLb4Sdox4jUuV9CI7X8kp7dyahpwNnbWj8OJxkqd",
// });
// export const CohereGenerate = async (
//     prompt: string,
//     maxTokens: number,
// ): Promise<string[]> => {
//     const prediction = await cohere.generate({
//         prompt,
//         maxTokens,
//     });
//     return prediction.generations.map((generation) => generation.text);
// }