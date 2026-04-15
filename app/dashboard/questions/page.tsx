import { QuestionsList } from "@/components/questions/questions-list"
import { AskQuestion } from "@/components/questions/ask-question"
import { MessageCircle } from "lucide-react"

export default function QuestionsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-1">
        <div className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-3 py-1 text-xs font-medium text-violet-700">
          <MessageCircle className="h-3.5 w-3.5" />
          Foro de la comunidad
        </div>

        <h1 className="text-2xl font-bold text-foreground">Comunidad (foro)</h1>
        <p className="text-sm text-muted-foreground">
          Hacé preguntas, respondé y resolvé dudas cotidianas con vecinos de tu zona.
        </p>
      </div>

      <AskQuestion />
      <QuestionsList />
    </div>
  )
}
