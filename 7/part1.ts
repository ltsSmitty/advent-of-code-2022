import * as helpers from '../helpers.ts'
import * as _ from 'https://cdn.skypack.dev/lodash';
/**
 * $ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k
 */


// type File = {
//     name: string;
//     size: number;
// }

// // const allFiles: File[] = [];
// type FileData = {
//     children: any[],
//     type: "file" | "directory",
//     id: number,
//     name: string,
//     parentName: string,
//     size: number
// }



// let parentName = "";

// const createFileMap = (lines: string[]) => {
//     for (const [index, line] of lines.entries()) {
//         const content = line.split(" ");
//         // console.log(`content`, content)
//         if (content.length === 3) {// it's cd
//             if (content[2] !== "..") {
//                 parentName = content[2];
//             }
//             continue;
//         }
//         if (content[0] == "$") { // it's ls
//             continue;
//         }
//         data.push({
//             name: content[1],
//             id: index,
//             parentName,
//             children: [],
//             type: (content[0] == "dir" ? "directory" : "file"),
//             size: (content[0] == "dir" ? 0 : parseInt(content[0]))
//         });
//     }
// }



// export const run = async () => {
//     // const lines = await helpers.readLinesFromTextFile("example-input.txt");
//     const lines = await helpers.readLinesFromTextFile("input.txt");
//     createFileMap(lines);
//     console.log(`data table:`);
//     console.table(data);

//     // loop over parentName and find the id of the first one that matches
//     const parentNameSet = new Set(data.map((el) => el.parentName));
//     // console.log(`parentNameSet`, parentNameSet);
//     const parentNameIDMap = Object.fromEntries([...parentNameSet].map((el) => {
//         const index = data.findIndex((el2) => el2.name === el);
//         return [el, index];
//     }));
//     console.log(`parentNameIDMap`, parentNameIDMap);

//     let root: FileData;
//     data.forEach((el, _i) => {
//         // Handle the root element
//         if (el.parentName === "") {
//             root = el;
//             return;
//         }
//         // Use our mapping to locate the parent element in our data array
//         const parentEl = data[parentNameIDMap[el.parentName]];
//         // Add our current el to its parent's `children` array
//         parentEl.children = [...(parentEl?.children ?? []), el];
//     });

//     getFolderSizes(root!);
//     // first select only the folders
//     console.log(`folderSizes`, folderSizes);
//     const idsUnder100000 = Object.keys(folderSizes).filter((key, _i) => {
//         // console.log(`key`, key, folderSizes[key])
//         return folderSizes[key] < 100000
//     })
//     const foldersUnder100000 = data.filter((el) => idsUnder100000.includes(el.id.toString()) && el.type === "directory");
//     console.log(`foldersUnder100000`, foldersUnder100000.map((el) => el.name));
//     // get all the values from foldersizes with ids from foldersUnder100000
//     const sumOfSizes = foldersUnder100000.map((el) => folderSizes[el.id]).reduce((acc, el) => acc + el, 0);
//     console.log(`sumOfSizes`, sumOfSizes);
// }

// // run()

// const folderSizes: { [key: string]: number } = {};

// const getFolderSizes = (data: FileData) => {
//     let thisFolderSize = 0;
//     // console.log(`current node: ${data.name}, size: ${data.size} `)
//     if (data.type === "file") {
//         thisFolderSize += data.size;
//     }
//     for (const child of data.children) {
//         thisFolderSize += getFolderSizes(child);
//     }
//     folderSizes[data.id] = thisFolderSize;
//     // console.log(`current node: ${data.id}, size: ${thisFolderSize} `)
//     return thisFolderSize;
// }


let navagationLevel = 0;

const navigationRecord: {
    navagationLevel: number,
    delta: "up" | "down" | "flat",
    size: number
}[] = [];

const data: {
    startingLevel: number;
    size: number;
    line: number;
}[] = []

const run2 = async () => {
    // const lines = await helpers.readLinesFromTextFile("example-input.txt");
    const lines = await helpers.readLinesFromTextFile("input.txt");

    lines.map(updateNavigationRecord);
    // data[0].startingLevel = navigationRecord[0].navagationLevel;

    for (const [index, line] of lines.entries()) {

        const lineType = getLineType(line);
        if (lineType !== "cdDown") {
            continue;
        }
        // console.log(`iterating through the ${lineType} on line ${index}`)

        let startLevel = navigationRecord[index].navagationLevel
        let currentLevel = startLevel;
        let currentSize = 0;
        let workingIndex = index;

        console.log(`starting information: startLevel: ${startLevel}, currentLevel: ${currentLevel}, currentSize: ${currentSize}, workingIndex: ${workingIndex}`)

        // while (startLevel <= currentLevel && navigationRecord[workingIndex].delta !== "up") {
        while (startLevel <= currentLevel && workingIndex < navigationRecord.length) {

            // skip until the directory that matches, aka dir d needs to wait til 19. is this happening?

            // console.log(`Process the dir on line ${index}`)
            // console.log(`workingIndex: ${workingIndex}, currentLevel: ${currentLevel}, startLevel: ${startLevel}, currentSize: ${currentSize}`)
            currentLevel = navigationRecord[workingIndex].navagationLevel;
            currentSize += navigationRecord[workingIndex].size;
            workingIndex += 1;
        }

        const finalValues = {
            startingLevel: startLevel,
            size: currentSize,
            line: index

        }
        console.log(`broke out of while loop at line ${workingIndex}`)
        console.log(`finalValues`, finalValues)
        data.push(finalValues)
    }

    console.table(data.sort((a, b) => a.size - b.size))

    const biggestDirectory = data.reduce((acc, el) => {
        if (el.size > acc.size) {
            return el;
        }
        return acc;
    }, { size: 0, line: 0, startingLevel: 0 })


    // const sizesUnder100k = data.filter((el) => el.size < 100000);
    // console.log(`sizesUnder100k`, sizesUnder100k);
    // const sumOfSizes = sizesUnder100k.map((el) => el.size).reduce((acc, el) => acc + el, 0);
    // console.log(`sumOfSizes`, sumOfSizes);
    const remainingSpace = 70000000 - biggestDirectory.size;
    const spaceNeeded = 30000000 - remainingSpace;
    console.log(`remainingSpace`, remainingSpace);
    console.log(`spaceNeeded`, spaceNeeded);
    console.log(`biggestDirectory`, biggestDirectory)

    // find the smalled element of data that is larger than spaceNeeded
    const smallestElementLargerThanSpaceNeeded = data.reduce((acc, el) => {
        if (el.size > spaceNeeded && el.size < acc.size) {
            return el;
        }
        return acc;
    }
        , { size: 100000000, line: 0, startingLevel: 0 })
    console.log(`smallestElementLargerThanSpaceNeeded`, smallestElementLargerThanSpaceNeeded)




}

const updateNavigationRecord = (line: string) => {
    // console.log(`starting level: ${navagationLevel}`)
    const content = line.split(" ");
    if (content.length === 3) {// it's cd
        if (content[2] == "..") { // it's navigating back up
            navagationLevel -= 1;
            navigationRecord.push({ navagationLevel, size: 0, delta: "up" });
            return;
        }
        navagationLevel += 1; // navigating down into a folder
        navigationRecord.push({ navagationLevel, size: 0, delta: "down" });
        // parentName = content[2];
        return
    }
    if (content[0] == "$") { // it's ls
        navigationRecord.push({ navagationLevel, size: 0, delta: "flat" });
        return;
    }
    if (content[0] == "dir") { // it's dir
        navigationRecord.push({ navagationLevel, size: 0, delta: "flat" });
        return;
    }
    // its a file
    navigationRecord.push({ navagationLevel, size: parseInt(content[0]), delta: "flat" });

}


run2()

type LineType = "cdUp" | "cdDown" | "directory" | "ls" | "file";

type LineValues = {
    type: LineType;
    name?: string;
    size?: number;
    depth: number
}

const getLineType = (line: string): LineType => {
    const content = line.split(" ");
    if (content.length === 3) {// it's cd
        if (content[2] == "..") { // it's navigating back up
            return "cdUp"
        }
        return "cdDown"; // navigating down into a folder
    }
    if (content[0] == "dir") { // it's dir
        return "directory";
    }
    if (content[0] == "$") { // it's ls
        return "ls";
    }
    return "file";
}

const getLineFileSize = (line: string) => {
    const content = line.split(" ");
    return parseInt(content[0]);
}


const getFolderSizes2 = (line: string) => {
    let thisFolderSize = 0;
    const lineType = getLineType(line);
    if (lineType === "file") {
        const lineFileSize = getLineFileSize(line);
        thisFolderSize += lineFileSize;
    }
    // for (const child of data.children) {
    //     thisFolderSize += getFolderSizes(child);
    // }
    // folderSizes[data.id] = thisFolderSize;
    // // console.log(`current node: ${data.id}, size: ${thisFolderSize} `)
    // return thisFolderSize;
}