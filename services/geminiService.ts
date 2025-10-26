
// This is a mock service. In a real application, you would import and use @google/genai.
// import { GoogleGenAI } from "@google/genai";

export const getAiAnalysis = async (prompt: string, lawTitle: string): Promise<string> => {
  console.log("Calling mock Gemini API with prompt:", prompt);
  // const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  // const response = await ai.models.generateContent({ model: 'gemini-2.5-pro', contents: `...` });
  // return response.text;

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  if (prompt.toLowerCase().includes('ekonomi')) {
    return `Dari perspektif **Ekonomi & Kebijakan Publik** untuk ${lawTitle}, fokus utamanya adalah pemulihan aset negara. Aset yang dirampas dapat dialokasikan kembali ke anggaran negara untuk program-program pro-rakyat seperti pendidikan dan kesehatan, sehingga mengurangi beban fiskal dan mendorong pertumbuhan ekonomi. Ini juga menciptakan iklim investasi yang lebih sehat dengan menunjukkan keseriusan dalam pemberantasan korupsi.`;
  }
  if (prompt.toLowerCase().includes('kriminologi')) {
    return `Dari sudut pandang **Kriminologi**, ${lawTitle} mengadopsi pendekatan "follow the money" yang terbukti efektif. Dengan menargetkan keuntungan finansial dari kejahatan, RUU ini menghilangkan motivasi utama para pelaku. Ini adalah bentuk pencegahan kejahatan yang lebih proaktif, bukan hanya reaktif menghukum pelakunya.`;
  }
  
  return `Tentu, saya akan jelaskan ${lawTitle}. Ini adalah sebuah instrumen hukum yang dirancang untuk mengatasi kejahatan ekonomi secara fundamental dengan merampas hasil kejahatan. Secara **Hukum**, RUU ini memperkenalkan konsep pembuktian terbalik yang kuat. Dari sisi **Politik**, ini menunjukkan komitmen negara. Sementara dari nilai **Agama dan Moral**, ini adalah langkah menegakkan keadilan dan mengembalikan hak publik yang telah dicuri.`;
};

export const getExternalAnalysis = async (): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 1200));
    return "Analisis eksternal menunjukkan bahwa RUU Perampasan Aset sejalan dengan praktik terbaik internasional seperti yang direkomendasikan oleh UNCAC (United Nations Convention Against Corruption). Namun, keberhasilannya akan sangat bergantung pada independensi lembaga penegak hukum dan sistem peradilan yang bersih.";
}

export const getGoogleSearchSummary = async (): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return `**Pemberitaan Media:** Media nasional secara luas meliput perdebatan RUU ini, menyoroti tarik-menarik kepentingan politik.
**Reaksi Masyarakat Sipil:** Koalisi anti-korupsi mendesak pengesahan segera, sementara beberapa kelompok HAM menyuarakan keprihatinan tentang potensi penyalahgunaan.
**Posisi Pemerintah:** Pemerintah menyatakan RUU ini adalah prioritas untuk menyelamatkan keuangan negara.`;
}
