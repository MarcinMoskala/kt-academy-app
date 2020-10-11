import Swal from "sweetalert2";
import {sendFeedback} from "./Network";
import {useTranslations} from "./Translations";

export function useFeedbackPopup(pageKey: string): () => void {
    const t = useTranslations()
    return () => Swal.fire<string>({
        input: 'textarea',
        inputPlaceholder: t.feedback.prompt,
        inputAttributes: {
            'aria-label': t.feedback.placeholder
        },
        showCancelButton: true
    }).then((text) => {
        if (text.value) {
            sendFeedback(pageKey, text.value)
                .then(() => Swal.fire(t.feedback.thankYou))
        }
    })
}