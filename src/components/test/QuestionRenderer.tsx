import { AnimatePresence } from 'framer-motion';
import { Question, Answer } from '@/types/test';
import { YesNoQuestion } from './YesNoQuestion';
import { EmojiScaleQuestion } from './EmojiScaleQuestion';
import { MultipleChoiceQuestion } from './MultipleChoiceQuestion';
import { TapRankQuestion } from './TapRankQuestion';

interface QuestionRendererProps {
  question: Question;
  onAnswer: (value: Answer['value']) => void;
  currentValue?: Answer['value'];
}

export function QuestionRenderer({ question, onAnswer, currentValue }: QuestionRendererProps) {
  return (
    <AnimatePresence mode="wait">
      <div key={question.id}>
        {question.type === 'yes-no' && (
          <YesNoQuestion
            text={question.text}
            emoji={question.emoji}
            onAnswer={onAnswer}
            currentValue={currentValue as boolean | undefined}
          />
        )}
        
        {question.type === 'slider' && (
          <EmojiScaleQuestion
            text={question.text}
            emoji={question.emoji}
            onAnswer={onAnswer}
            currentValue={currentValue as number | undefined}
          />
        )}
        
        {question.type === 'multiple-choice' && question.options && (
          <MultipleChoiceQuestion
            text={question.text}
            emoji={question.emoji}
            options={question.options}
            onAnswer={onAnswer}
            currentValue={currentValue as string | undefined}
          />
        )}
        
        {question.type === 'rank' && question.options && (
          <TapRankQuestion
            text={question.text}
            emoji={question.emoji}
            options={question.options}
            onAnswer={onAnswer}
            currentValue={currentValue as string[] | undefined}
          />
        )}
      </div>
    </AnimatePresence>
  );
}
