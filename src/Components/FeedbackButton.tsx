import {useTranslations} from "../Translations";
import {useFeedbackPopup} from "../Popups";
import React from "react";

export const FeedbackButton = ({pageKey}: { pageKey: string }) => {
    const t = useTranslations();
    const showFeedbackPopup = useFeedbackPopup(pageKey)
    return <div className="clickable" onClick={showFeedbackPopup}>{t.feedback.button}</div>
}