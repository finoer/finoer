interface MetaData {
    root: string;
    name: string;
    downloadTemp: string;
    metadata: {
        projectName: string;
        author: string;
        description: string;
    };
}
export default function generate(context: MetaData): Promise<unknown>;
export {};
