import mammoth from "mammoth";

export function readTxtFile(file: File): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    let list: string[] = [];

    reader.onload = (event: any) => {
      const text = event.target.result;

      const lines = text
        .split(/\r?\n/)
        .map((line: string) => line.trim())
        .filter((line: string) => line.length > 0);

      for (let i = 0; i < lines.length; i++) {
        const data = lines[i];

        if (data.includes(',')) {
          list = list.concat(comma(data));
          continue;
        }

        if (data.includes(' ')) {
          list = list.concat(space(data));
          continue;
        }

        list.push(data);
      }

      resolve(list); // ✅ return data here
    };

    reader.onerror = (err) => {
      reject(err);
    };

    reader.readAsText(file);
  });
}


export function readDocxFile(file: File): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    let list: string[] = [];

    reader.onload = async (event: any) => {
      try {
        const arrayBuffer = event.target.result;

        const result = await mammoth.extractRawText({ arrayBuffer });
        const text = result.value;

        const lines = text
          .split(/\r?\n/)
          .map((line: string) => line.trim())
          .filter((line: string) => line);

        for (const data of lines) {
          if (data.includes(',')) {
            list = list.concat(comma(data));
            continue;
          }

          if (data.includes(' ')) {
            list = list.concat(space(data));
            continue;
          }

          list.push(data);
        }

        resolve(list); // ✅ return here
      } catch (err) {
        reject(err);
      }
    };

    reader.onerror = (err) => reject(err);

    reader.readAsArrayBuffer(file);
  });
}


function comma(line: string): string[]{
    const list = [];
    const splitdata = line.split(",");
    for(let i = 0; i < splitdata.length; i++){
        list.push(splitdata[i].trim());
    }

    return list;
}

function space(line: string): string[]{
    const list = [];
    const splitdata = line.split(" ");
    for(let i = 0; i < splitdata.length; i++){
        list.push(splitdata[i].trim());
    }

    return list;
}