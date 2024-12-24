import type { BookData } from "@/types/types";

const fetchBooks = async (q?: string): Promise<BookData[]> => {
  let url = `http://localhost:12345/book`;

  if (q) {
    url += `/search?q=${q}`
  }

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error();

    return await res.json();
  } catch (err) {
    console.error(err);

    return [];
  }
};

export default fetchBooks;
