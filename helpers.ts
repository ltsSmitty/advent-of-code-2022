
export const readLinesFromTextFile = async (filename: string, breakChar = "\n") => {
    const text = await Deno.readTextFile(filename)
    return text.split(breakChar);
}