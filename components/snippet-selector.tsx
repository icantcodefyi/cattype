import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CodeSnippet, codeSnippets } from "@/lib/code-snippets";
import { Badge } from "@/components/ui/badge";

interface SnippetSelectorProps {
  selectedSnippet: CodeSnippet;
  onSnippetChange: (snippet: CodeSnippet) => void;
}

export function SnippetSelector({
  selectedSnippet,
  onSnippetChange,
}: SnippetSelectorProps) {
  // Group snippets by language
  const snippetsByLanguage = codeSnippets.reduce((acc, snippet) => {
    if (!acc[snippet.language]) {
      acc[snippet.language] = [];
    }
    acc[snippet.language].push(snippet);
    return acc;
  }, {} as Record<string, CodeSnippet[]>);

  return (
    <div className="flex justify-center items-center relative">
      <Select
        value={selectedSnippet.id}
        onValueChange={(value) => {
          const snippet = codeSnippets.find((s) => s.id === value);
          if (snippet) onSnippetChange(snippet);
        }}
      >
        <SelectTrigger className="flex justify-center items-center border-none shadow-none focus:ring-0 hover:bg-transparent [&>svg]:hidden">
          <SelectValue>
            <span className="text-md font-semibold">
              {selectedSnippet.language}
            </span>
          </SelectValue>
        </SelectTrigger>
        <SelectContent 
          position="popper" 
          className="w-[280px] shadow-md" 
          align="center"
          sideOffset={5}
        >
          {Object.entries(snippetsByLanguage).map(([language, snippets]) => (
            <SelectGroup key={language}>
              <SelectLabel className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">
                {language}
              </SelectLabel>
              {snippets.map((snippet) => (
                <SelectItem key={snippet.id} value={snippet.id} className="hover:bg-accent">
                  <div className="flex items-center justify-between w-full">
                    <span>{snippet.name}</span>
                    <Badge variant="secondary" className="ml-2">
                      {snippet.difficulty}
                    </Badge>
                  </div>
                </SelectItem>
              ))}
            </SelectGroup>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
} 