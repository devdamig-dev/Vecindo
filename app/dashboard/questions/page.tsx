import { QuestionsList } from "@/components/questions/questions-list"
import { AskQuestion } from "@/components/questions/ask-question"

export default function QuestionsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Preguntas de la Comunidad</h1>
        <p className="text-sm text-muted-foreground">Pregunta y responde en tu zona</p>
      </div>
      <AskQuestion />
      <QuestionsList />
    </div>
  )
}
