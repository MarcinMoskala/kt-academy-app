import React, {useContext} from "react";
import { useLocation } from 'react-router-dom'

export const LangContext = React.createContext('light');

export const Lang = {
    PL: "PL",
    EN: "EN"
}

export function useTranslations() {
    return useLang() === Lang.PL ? PL_desc : EN_desc
}

export function useLang() {
    return useContext(LangContext)
}

type PangElement = {
    key: string,
    path: string,
    flagIcon: string,
}

export function useLanguagesList(): PangElement[] {
    const path = useLocation().pathname.replace("/pl", "");
    return [
        {key: Lang.PL, path: "/pl" + path, flagIcon: "pl-flag.png"},
        {key: Lang.EN, path: path, flagIcon: "uk-flag.png"}
    ]
}

const EN_desc = {
    "description": "Kt. Academy - Teaching is our passion. If you want to migrate from Java to Kotlin or improve your's team Kotlin skills, our workshops are definitely for you. Check our workshop: Kotlin for Android Developers, Effective Kotlin, Kotlin Coroutines, Kotlin for Backend Developers. We focus on good practices and we make our workshops as practical as possible.",
    "tagsSEO" : "Kotlin, workshop, training, Android, programming, coding, development, java, move to kotlin, java to kotlin",
    "title" : "Kt. Academy - workshops with focus on best practices",
    "menu": {
        "home": "HomePage",
        "whyUs": "Why Us",
        "trainer": "Trainer",
        "materials": "Materials",
        "workshops" : "Workshops",
        "upcomingWorkshops" : "Workshops",
        "privateWorkshops" : "Workshops",
        "articles": "Articles",
        "workshopMaterial": "Topics",
        "register": "Register",
        "contact": "Contact"
    },
    "flag": {
        "imgLink": "/static/images/uk-flag.png",
        "lang": "EN"
    },
    "slogan": {
        "title": "WE TEACH PROGRAMMING",
        "subtitle": "WITH FOCUS ON THE BEST PRACTICES"
    },
    "workshopOffer": {
        "title": "What training do you need?",
        "subtitle": "",
        "kotlinTitle": "Kotlin trainings",
        "kotlinDesc": "Workshops dedicated to Kotlin ecosystem, including Coroutines and Android.",
        "kotlinButton" : "Check the most popular workshops",
        "bestPracticesTitle": "Best practices trainings",
        "bestPracticesDesc": "Workshops for all kinds of developers, teaching best practices, design patterns and refactoring.",
        "bestPracticesButton" : "Check the most popular workshops"
    },
    "whyUs": {
        "title": "Why training with us?",
        "subtitle": "Our workshops are conducted by world-class experts, focus on best practices and made as practical as possible.",
        "practicalTitle" : "Learn by doing",
        "practicalDesc1" : "We support learning with practical exercises, programming puzzlers and challenges.",
        "practicalDesc2" : "Check examples to know what to expect from the workshop.",
        "puzzlers" : "Puzzlers",
        "puzzlersButton" : "Check example puzzler!",
        "challenges" : "Coding challenges",
        "challengesButton" : "Check example challenge!",
        "app" : "Build practical applications ",
        "bestTitle" : "Learn from the best"
    },
    "trainerBio" : "Marcin Moskała is an experienced Android developer, teacher, and <a href=\"https://www.jetbrains.com/company/partners/#countries=Poland&profession=TrainingPartner&speciality=Kotlin&technologies=Kotlin\"> an official Jetbrains' Kotlin training partner</a>. He is the founder of <a href=\"https://kt.academy\"> Kt. Academy</a>, author of the books <a href=\"https://leanpub.com/effectivekotlin/\"> \"Effective Kotlin\"</a> and <a href=\"https://www.packtpub.com/application-development/android-development-kotlin\"> \"Android Development with Kotlin\"</a>, and an active programming community member. He is also the main author on <a href=\"https://blog.kotlin-academy.com\"> the biggest medium publication about Kotlin </a> and a speaker invited to many programming conferences.",
    "wlodzimierzKrakowskiBio" : "Experienced developer, trainer and a speaker on international conferences. Specialised in handling and refactoring legacy code.",
    "certificateTitle" : "One of the first certified Kotlin training worldwide",
    "certificateDesc" : "You will be trained by an expert who is an official JetBrains' Kotlin training partner. The quality of his workshops was checked and certified by the creators of the Kotlin language itself.",
    "materials" : {
        "title": "Professional training materials",
        "book" : "The book with all the slides to make it easier to start using new knowledge after the workshop - everything in one place to recall new functionalities.",
        "cheatsheet" : "Cheatsheet in a printed, laminated form. Now you can have all the essentials at hand — it is the best daily support for a Kotlin developer.",
        "tasks" : "A lot of tasks and questions to practice during the workshop. We do our best to make the training as practical as possible."
    },
    "testimonials" : {
        "subtitle": "We've helped over 300 developers from over 40 companies around the world in a smooth transition to Kotlin",
        "saramak" : "\"On this workshop, I not only systematized knowledge about Kotlin syntax but also, thanks to Marcin, I changed my way of thinking about problem-solving to functional way - I got a new tool that I can use at work on a daily basis. It seems to me that whole training is focused on immediate use of new knowledge in daily work. Big +\"",
        "nazaruk" : "\"I have participated in great Kotlin for Android Developers training, with extremely competent Marcin Moskala from Kt. Academy as a trainer. It was an intensive 3-days Kotlin workshop, ended with a quite difficult and thorough exam. With experience and knowledge under my belt acquired in this course, I feel confident about my future as an Android Developer.\"",
        "grajewski" : "\"Very good workshop. Perfect for developers that want to move easily from Java to Kotlin. During the workshop, we did plenty of exercises that enabled checking new knowledge in practice.\"",
        "button" : "Book a practical workshop tailored to your needs"
    },
    "contact": {
        "title": "Let's talk!",
        "stayInTouch": "Stay in touch!",
        "pricing": {
            "description": "Tell us more about your needs and the level of your team, so we can prepare the adjusted offer and send you the right pricing.",
            "button": "Ask for pricing"
        },
        "twitter": {
            "title": "Follow us on Twitter",
            "description": "We have a community of more than 2800 followers and we only post Kotlin related content."
        },
        "mail": {
            "title": "Write an email",
            "description": "We are happy to talk about our workshops and adjust them to your needs. Contact us if you have any questions.",
            "button": "Contact Us"
        },
        "newsletter": {
            "title": "Sign up to our mailing list",
            "description": "Stay updated with our articles and workshops. We only send Kotlin related content.",
            "button": "Sign up"
        }
    },
    "partners" : "Our partners",
    "LogoMeetupWwa": "/static/images/Meetup-wwa.png",
    "LogoMeetupKrk": "/static/images/Meetup-krk.png",
    "footerContact" : "Contact Us:",
    "privacyPolicy": "Privacy policy",
    "publicWorkshop" : {
        "titleHead" : "Public Kotlin workshops",
        "title" : "PUBLIC KOTLIN WORKSHOPS",
        "subtitle" : "Great solution for individuals and small teams",
        "offerTitle" : "Upcoming Workshops",
        "offerDesc" :"Join one of the upcoming workshops! We conduct also online workshops so you can attend no matter where you are from. You will learn in a small group of experienced developers from different companies.",
        "location" : "Location: ",
        "workshopLang" : "Language: ",
        "time" : "Time: ",
        "button" : "More information about the workshop",
        "belowButton" : "Book workshop with our trainer",
        "otherOption" : {
            "title" : "Looking for some other date? ",
            "subtitle" : "Leave us your mail and we will update you on upcoming workshop. You can also fill the form to share your preferences.",
            "button" : "Notify me about the dates!",
            "belowButton" : "I want to fill the form with my preferences"
        },
        "privateOption1" : "If you are looking for a workshop conducted at your company, check our",
        "privateOption2" : "private workshop section"
    },
    "privateWorkshop" : {
        "titleHead" : "Kt. Academy - Private Kotlin workshops",
        "title" : "PRIVATE KOTLIN WORKSHOPS",
        "subtitle" : "Tailor made to the needs of your team",
        "offerTitle" : "Book a workshop only for your team",
        "offerDesc" :"You can choose from the proposals below, or we can prepare something tailored to your needs. We conduct both in-company and online trainings. ",
        "button" : "More information about the workshop",
        "belowButton" : "Ask for pricing",
        "otherOption" : "We list only the most popular workshops on our website. If you don't see the course you need or require a tailored version of it, then please write to us:",
        "benefits" : {
            "title" : "The benefits of private training",
            "tailoredTitle" : "Tailored made",
            "tailoredDesc" : "Do you have specific needs? No worries, we will customize our training so you will take the most advantage.",
            "dateTitle" : "Flexible dates",
            "dateDesc" : "Do only certain dates suit you? No problem, let us deliver the workshop on time that suits you best.",
            "locationTitle" : "Choose location",
            "locationDesc" : "We can deliver training at your company anywhere in the world, or if you prefer we can conduct it online. "
        }
    },
    "knowledgeSources": {
        "title": "On the workshop you will",
        "lecture": "Learn from lecture supported by slides",
        "exercises": "Complete practical exercises",
        "puzzlers": "Solve puzzlers"
    },
    "titleToc": "In the workshop we cover:",
    "titleRequirements": "Requirements",
    "titleHowLong": "How long does it take?",
    "registration": {
        "title": "Join the workshop",
        "whenTitle": "When:",
        "whereTitle": "Where:",
        "langTitle": "Language:",
        "examWhenTitle": "Exam for certification:",
        "examPriceTitle": "Price for the exam and certification:",
        "examExtraDesc": "Participation in a 3-day course is required to take an exam. <br> Certificate is issued by Kt. Academy and is signed by a Kotlin trainer certified by JetBrains.",
        "priceTitle":"Price per person:",
        "button": "Register",
        "newsletterPart1": "If you want to be notified about the next workshops, sign up to",
        "newsletterPart2": "our mailing list."
    },
    "singleDay": {
        "title": "Additional offer - 1-day workshop ",
        "infoPossibility": "You can also participate only in the first day of the workshop (",
        "infoMaterial": ") - during this day we cover basics of Kotlin.",
        "infoPrice":"Price is ",
        "infoHowToRegister": ". In order to register for one day, choose this option in the form above."
    },
    "puzzler" : {
        "descriptionSEO" : "Check exemplary puzzlers that you will be solving on Kt. Academy workshops. We believe that training needs to be as practical as possible.",
        "tagsSEO": "Kotlin, workshop, Android, programming, coding, development, puzzler, exercise, practical workshop",
        "title" : "Learn by doing",
        "subtitle" : "Train new Kotlin skills solving practical puzzlers",
        "whatArePuzzlers": "What are the puzzlers?",
        "description" : "Puzzlers are tricky programming challenges with often surprising answers. They show how bad practices can lead to problems.",
        "examplesTitle" : "Exemplary puzzlers",
        "whatPrint" : "What will it print?",
        "whatDisplay" : "What does it display?",
        "showAnswers" : "Show answer and explanation",
        "correctAnswer" : "Correct answer",
        "explanation" : "Explanation",
        "puzzle1Title" : "Order of nullable operators",
        "puzzle1Answers" : {
            "a" : "a) 3",
            "b" : "b) 5",
            "c" : "c) 2",
            "d" : "d) 0"
        },
        "puzzle1Explanation" : "Elvis operator has lower precedence than + so plus is evaluated first and y lend on right side of Elvis operator. Use brackets to correct this.",
        "puzzle2Title" : "Extensions are resolved statically",
        "puzzle2Answers" : {
            "a" : "a) Doesn't compile",
            "b" : "b) Runtime error",
            "c" : "c) \"c\"",
            "d" : "d) \"d\""
        },
        "puzzle2Explanation" : "This example will print \\\"c\\\" because the extension function being called depends only on the declared type of the parameter c, which is the C class.</p>\"+\n            \"<p>Extensions do not actually modify classes they extend. By defining an extension, you do not insert new members into a class, but merely make new functions callable with the dot-notation on variables of this type."
    },
    "challenge" : {
        "descriptionSEO" : "Check exemplary challenge that you will be solving on Kt. Academy website. We believe that training needs to be as practical as possible.",
        "tagsSEO": "Kotlin, workshop, Android, programming, coding, development, puzzler, exercise, practical workshop",
        "title" : "Learn by doing",
        "subtitle" : "Train new Kotlin skills solving practical challenges",
        "whatAreChallenges": "What are the challenges?",
        "description" : "Small programming tasks that requires you to implement a function or a class in Kotlin. Thanks to them you can check in practice if you understand material correctly and train it to be able to use it immediately after the workshop. All challenges are verified by unit tests.",
        "examplesTitle" : "Exemplary challenges"
    },
    "form" : {
        "title" : "Request for ",
        "emailPrompt" : "Your email",
        "companyNamePrompt" : "Company name",
        "groupSizePrompt" : "For how many people do you need this workshop?",
        "orMore" : "or more",
        "countryPrompt" : "Country or region",
        "isOnlinePrompt" : "Are you interested in in-company or online training?",
        "inCompany" : "In-company",
        "online" : "Online",
        "datePrompt" : "What date suits you best?",
        "extraPrompt" : "Is there anything else you would like to share?",
        "submit" : "Submit"
    },
    "formRegisterPublic" : {
        "title" : "Register for",
        "q_name" : "What is your name?",
        "q_company" : "What is your company name?",
        "submit" : "Submit"
    }
}

const PL_desc = {
    "description": "Kt. Academy - Uczenie to nasza pasja. Jeśli chcesz przejść z języka Java na Kotlin lub doskonalić umiejętności programowania w Kotline Twojego zespołu, nasze szkolenia są zdecydowanie dla Ciebie. Sprawdź warsztaty: Kotlin dla programistów Android, Effective Kotlin, Kotlin Coroutines, Kotlin dla programistów backend. Skupiamy się na najlepszych praktykach i na praktyce.",
    "tagsSEO" : "Kotlin, warsztat, szkolenie, Android, programowanie, kodowanie, development, java, przejść na kotlin, java na kotlin",
    "title" : "Kt. Academy - Szkolenia skupiające się na najlepszych praktykach",
    "menu": {
        "home": "Strona Główna",
        "whyUs": "Dlaczego my?",
        "workshopMaterial": "Zagadnienia",
        "trainer": "Trener",
        "materials": "Materiały",
        "workshops" : "Warsztaty",
        "upcomingWorkshops" : "Warsztaty",
        "privateWorkshops" : "Warsztaty",
        "articles": "Artykuły",
        "register": "Rejestracja",
        "contact": "Kontakt"
    },
    "flag": {
        "imgLink": "/static/images/pl-flag.png",
        "lang": "PL"
    },
    "slogan": {
        "title": "UCZYMY PROGRAMOWANIA",
        "subtitle": "SKUPIAJĄC SIĘ NA NAJLEPSZYCH PRAKTYKACH"
    },
    "workshopOffer": {
        "title": "Jakiego warsztatu szukasz?",
        "subtitle": "",
        "kotlinTitle": "Warsztaty z Kotlina",
        "kotlinDesc": "Warsztaty dedykowane ekosystemowi Kotlina, w tym Coroutines i Android.",
        "kotlinButton" : "Sprawdź najpopularniejsze warsztaty",
        "bestPracticesTitle": "Warsztaty z dobrych praktyk",
        "bestPracticesDesc": "Warsztaty dla programistów różnych języków i technologii, dedykowane jakości kodu, wzorcom projektowym, refaktoryzacji i oczywiście najlepszym praktykom",
        "bestPracticesButton" : "Sprawdź najpopularniejsze warsztaty"
    },
    "whyUs": {
        "title": "Czemu warto szkolić się z nami?",
        "subtitle": "Nasze warsztaty prowadzone są przez ekspertów światowej klasy, nastawione są na dobre praktyki i skupiają się na ćwiczeniach praktycznych.",
        "practicalTitle" : "Ucz się poprzez praktyczne zadania",
        "bestTitle" : "Ucz się od najlepszych",
        "practicalDesc1" : "Wspieramy naukę poprzez praktyczne ćwiczenia, puzzlery i wyzwania programistyczne.",
        "practicalDesc2" : "Sprawdź przykłady, żeby wiedzieć czego spodziewać się na warsztacie.",
        "puzzlers" : "Puzzlery",
        "puzzlersButton" : "Sprawdź przykładowy puzzler!",
        "challenges" : "Wyzwania programistyczne",
        "challengesButton" : "Sprawdź przykładowe wyzwanie!",
        "app" : "Tworzenie praktycznych aplikacji"
    },
    "trainerBio" : "Marcin Moskała jest doświadczonym programistą Android, nauczycielem Kotlina z zamiłowania i <a href=\"https://www.jetbrains.com/company/partners/#countries=Poland&profession=TrainingPartner&speciality=Kotlin&technologies=Kotlin\"> oficjalnym partnerem szkoleniowym Jetbrains' w zakresie szkoleń z języka Kotlin</a>. Jest założycielem <a href=\"https://kt.academy\"> Kt. Academy</a>, autorem książek <a href=\"https://leanpub.com/effectivekotlin/\"> \"Effective Kotlin\"</a> i <a href=\"https://www.packtpub.com/application-development/android-development-kotlin\"> \"Android Development with Kotlin\"</a> oraz aktywnym członkiem społeczności programistycznej. Jest także głównym autorem artykułów na <a href=\"https://blog.kotlin-academy.com\"> największej publikacji medium o Kotlinie </a> oraz prelegentem zapraszanym na wiele programistycznych konferencji.",
    "wlodzimierzKrakowskiBio" : "Jestem trenerem technicznym oraz prelegentem na konferencjach, specjalizującym się w zagadnieniach pracy z kodem zastanym i długiem technicznym poprzez techniki refaktoryzacji kodu. Mieszkam w Krakowie, ale często podróżuję po Polsce, Europie i świecie, aby wspierać moich klientów w ich działaniach.",
    "certificateTitle" : "Jeden z pierwszych certyfikowanych treningów z Kotlina",
    "certificateDesc" : "Jakość tego warsztatu została sprawdzona i certyfikowana przez twórców języka Kotlin. Szkolić Was będzie trener, który jest oficjalnym partnerem JetBrains w zakresie szkoleń z języka Kotlin.",
    "materials" : {
        "title": "Profesjonalne materiały szkoleniowe",
        "book" : "Książka ze wszystkimi slajdami, żeby ułatwić korzystanie z nowej wiedzy w praktyce, od razu po zakończeniu warsztatu - cały materiał w jednym miejscu.",
        "cheatsheet" : "Kotlin cheatsheet w formie drukowanej i laminowanej. Teraz możesz mieć najważniejsze elementy pod ręką  - to najlepsze codzienne wsparcie programisty Kotlin.",
        "tasks" : "Dużo zadań i pytań do ćwiczeń praktycznych. Robimy, co możemy, żeby nasze warsztaty były tak praktyczne, jak to tylko możliwe."
    },
    "testimonials" : {
        "subtitle": "Pomogliśmy ponad 250 programistom z ponad 38 firm na całym świecie w przejściu na język Kotlin",
        "saramak" : "\"Na warsztacie nie tylko usystematyzowałem sobie wiedzę ze składni języka kotlin, ale dzięki Marcinowi przestawiłem swoje myślenie o możliwości rozwiązania problemu w funkcjonalny sposób - dostałem do ręki nowe narzędzie, które moge wykorzystać w codziennej pracy. Wydaje mi się, że całe szkolenie jest nastawione na natychmiastowy zwrot zdobytej wiedzu w codziennej pracy. Duży +\"",
        "nazaruk" : "\"Kotlin dla programistów Android to świetne warsztaty, prowadzone przez niezwykle kompetentnego trenera z Kt. Academy, Marcina Moskałę. To był intensywny, 3-dniowy kurs Kotlina, zakończony niełatwym egzaminem. Jestem pewna, że z wiedzą zdobytą na kursie, oraz certyfikatem wydanym po zdanym egzaminie mogę z optymizmem spojrzeć na swoją przyszłość jako Android Developer.\"",
        "grajewski" : "\"Bardzo dobre szkolenie. W sam raz dla programistów, którzy w łatwy sposób chcą przenieść się z Javy na Kotlina. Szkolenie zawiera także ćwiczenia, które umożliwiają sprawdzenie nowej wiedzy w praktyce.\"",
        "button" : "Zarezerwuj praktyczne szkolenie z języka Kotlin"
    },
    "contact": {
        "title": "Porozmawiajmy!",
        "stayInTouch": "Bądźmy w kontakcie!",
        "pricing": {
            "description": "Powiedz nam więcej o potrzebach i poziomie Twojego zespołu, a my dopasujemy program kursu i wyślemy adekwatną ofertę.",
            "button": "Prośba o ofertę"
        },
        "twitter": {
            "title": "Obserwuj nas na Twitter",
            "description": "Zrzeszamy społeczność ponad 2800 obserwujących i publikujemy tylko treści związane z Kotlinem"
        },
        "mail": {
            "title": "Skontaktuj się z nami",
            "description": "Z chęcią opowiemy o naszych warsztatach i dostosujemy je do Twoich potrzeb. Napisz, jeżeli masz jakieś pytania.",
            "button": "Napisz do nas"
        },
        "newsletter": {
            "title": "Zapisz się do newslettera",
            "description": "Bądź na bieżąco z naszymi artykułami i szkoleniami. Wysyłamy tylko informacje związane z Kotlinem.",
            "button": "Zapisz się"
        }
    },
    "partners" : "Nasi partnerzy",
    "LogoMeetupWwa": "/static/images/Meetup-wwa-pl.png",
    "LogoMeetupKrk": "/static/images/Meetup-krk-pl.png",
    "footerContact" : "Napisz do nas:",  "privacyPolicy": "Polityka prywatności",
    "publicWorkshop" : {
        "titleHead" : "Publiczne warsztaty z Kotlina",
        "title" : "PUBLICZNE WARSZTATY",
        "subtitle" : "Dobre rozwiązanie dla osób indywidualnych i małych zespołów",
        "offerTitle" : "Nadchodzące warsztaty",
        "offerDesc" :"Dołącz do jednego z nadchodzących wasztatów! Prowadzimy warsztaty zarówno stacjonarne jak i online. Będziesz się uczył w małej grupie doświadczonych programistów z różnych firm.",
        "location" : "Miejsce: ",
        "workshopLang" : "Język: ",
        "time" : "Czas: ",
        "button" : "Więcej informacji o warsztacie",
        "belowButton" : "Zarejestruj sie na szkolenie",
        "otherOption" : {
            "title" : "Szukasz szkolenia w innym terminie? ",
            "subtitle" : "Zostaw nam swojego maila, abyśmy mogli dać Ci znać kiedy zaplanujemy kolejne warsztaty. Możesz także wypełnić formularz informując nas o Twoich preferencjach",
            "button" : "Powiadom mnie o nowych terminach!",
            "belowButton" : "Chcę wypełnić formularz z preferencjami"
        },
        "privateOption1" : "Jeśli szukasz warsztatów dedykowanych Twojemu zespołowi sprawdź sekcję",
        "privateOption2" : "prywatne warsztaty"
    },
    "privateWorkshop" : {
        "titleHead" : "Kt. Academy - Prywatne warsztaty z Kotlina",
        "title" : "WARSZTATY DLA FIRM",
        "subtitle" : "Uszyte na miarę potrzeb Twojego zespołu",
        "offerTitle" : "Zarezerwuj warsztat dla Twojego zespołu",
        "offerDesc" :"Możesz wybrać spośród poniższych propozycji lub możemy przygotować warsztat dopasowany do Twoich potrzeb. Prowadzimy zarówno warsztaty w siedzibie firmy, jak i online.",
        "button" : "Więcej informacji o warsztacie",
        "belowButton" : "Zapytaj o ofertę",
        "otherOption" : "Na stronie umieszczamy najpopularniejsze warsztaty. Jeśli nie widzisz szkolenia, które Cię interesuje lub chciałbyś dopasować materiał kursu do potrzeb i poziomu zespołu, skontaktuj się z nami:",
        "benefits" : {
            "title" : "Zalety prywatnego szkolenia",
            "tailoredTitle" : "Dostosowane do Twoich potrzeb",
            "tailoredDesc" : "Masz specyficzne potrzeby dotyczące warsztatu? Dostosujmy program szkolenia tak, żeby Twój zespół zyskał jak najwięcej potrzebnej wiedzy.",
            "dateTitle" : "Elastyczna data",
            "dateDesc" : "Odpowiadają Wam tylko konkretne daty? Dopasujemy datę, godziny oraz liczbę dni szkoleniowych tak, żeby była dla Was odpowiednia.",
            "locationTitle" : "Możesz wybrać lokalizację",
            "locationDesc" : "Przeprowadzimy szkolenie w siedzibie Twojej firmy, w każdym miejscu na świecie. Możemy również zorganizować warsztaty online. "
        }
    },
    "knowledgeSources": {
        "title": "Podczas warsztatu nauczysz się poprzez:",
        "lecture": "Wykład wspierany slajdami",
        "exercises": "Wykonanie praktycznych ćwiczeń",
        "puzzlers": "Rozwiązanie Kotlinowych puzzler'ów"
    },
    "titleToc": "Materiał omawiany podczas warsztatu:",
    "titleRequirements": "Wymagania",
    "titleHowLong": "Ile trwa ten warsztat?",
    "registration": {
        "title": "Zapisz się na warsztat",
        "whenTitle": "Kiedy:",
        "whereTitle": "Gdzie:",
        "langTitle": "Język:",
        "examWhenTitle": "Termin egzaminu:",
        "examPriceTitle": "Cena za egzamin i certyfikację: ",
        "examExtraDesc": "Udział w 3-dniowym szkoleniu jest wymagany do podejścia do egzaminu. <br> Certyfikat jest wydany przez Kt. Academy i jest podpisany przez trenera Kotlin certyfikowanego przez JetBrains.",
        "priceTitle":"Cena za osobę:",
        "button": "Zarejestruj się",
        "newsletterPart1": "Jeżeli chcesz otrzymywać informacje o następnych warsztatach to zapisz się do",
        "newsletterPart2": "naszej listy mailingowej."
    },
    "singleDay": {
        "title": "Oferta dodatkowa - 1-dniowy warsztat",
        "infoPossibility": "Możesz również wziąć udział tylko w pierwszym dniu warsztatu (",
        "infoMaterial": ") - podczas tego dnia poznasz podstawy Kotlina.",
        "infoPrice":"Cena wynosi ",
        "infoHowToRegister":". Żeby zarejestrować się na pierwszy dzień, wybierz odpowiednią opcję w formularzu na górze."
    },
    "puzzler" : {
        "descriptionSEO" : "Sprawdź przykladowe puzzlery, które programiści rozwiązują na warsztatach Kt. Academy. Wierzymy, że szkolenie powinno być tak praktyczne jak tylko możliwe.",
        "tagsSEO": "Kotlin, warsztat, Android, programowanie, ćwiczenia Kotlin, puzzler, wyzwania programistyczne",
        "title" : "Ucz się przez praktykę",
        "subtitle" : "Rozwiąż Kotlinowe puzzlery",
        "whatArePuzzlers": "Co to są puzzlery?",
        "description" : "Puzzlery to podchwytliwe programistyczne wyzwania, z często zaskakującymy odpowiedziami. Pokazują jak złe praktyki mogą prowadzić do problemów.",
        "examplesTitle" : "Przykładowe puzzlery",
        "whatPrint" : "Co zostanie wydrukowane?",
        "whatDisplay" : "Co zostanie wyświetlone?",
        "showAnswers" : "Pokaż odpowiedź i rozwiązanie",
        "correctAnswer" : "Poprawna odpowiedź",
        "explanation" : "Wyjaśnienie",
        "puzzle1Title" : "Kolejność",
        "puzzle1Answers" : {
            "a" : "a) 3",
            "b" : "b) 5",
            "c" : "c) 2",
            "d" : "d) 0"
        },
        "puzzle1Explanation" : "Jest to programistyczny odpowiednik równania 1 + 2 * 3 = ?. Operator Elvisa ma niższy priorytet niż plus i w związku z czym będzie on wykonany później. Mylący jest tutaj brak spacji. Używaj nawiasów, nie białych znaków.",
        "puzzle2Title" : "Funkcje rozszerzające",
        "puzzle2Answers" : {
            "a" : "a) Doesn't compile",
            "b" : "b) Runtime error",
            "c" : "c) c",
            "d" : "d) d"
        },
        "puzzle2Explanation" : "Zostanie wydrukowane c ze względu na to czym są funkcje rozszerzające - są zwykłymi funkcjami a receiver (tutaj C i D) jest pierwszym parametrem. Zachowywać się więc będą tak jak byśmy mieli 2 funkcje statyczne foo z różnymi parametrami. To, która z nich zostanie ostatecznie wybrana będzie zależeć od tego jaki jest typ przekazanej wartości. Zostanie to określone statycznie w czasie kompilacji."
    },
    "challenge" : {
        "descriptionSEO" : "Sprawdź przykładowe wyzwania, które programiści rozwiązują na warsztatach Kt. Academy. Wierzymy, że szkolenie musi być tak praktyczne jak tylko możliwe.",
        "tagsSEO": "Kotlin, warsztat, Android, programowanie, ćwiczenia Kotlin, puzzler, wyzwania programistyczne",
        "title" : "Ucz się przez praktykę",
        "subtitle" : "Wyćwiczysz nowe umiejętności rozwiązując programistyczne wyzwania",
        "whatAreChallenges": "Co to są wyzwania programistyczne?",
        "description" : "Małe programistyczne zadania, które wymagają zaimplementowania funkcji albo klasy w języku Kotlin. Dzięki temu możesz sprawdzić w praktyce czy rozumiesz poprawnie materiał z kursu i wyćwiczyć to żeby być w stanie używać nowych umiejętności od razu po warsztacie. Wszystkie wyzwania zostały zweryfikowane przez testy jednostkowe.",
        "examplesTitle" : "Przykładowe wyzwania"
    },
    "form" : {
        "title" : "Prośba o wycenę szkolenia ",
        "emailPrompt" : "Twój email",
        "companyNamePrompt" : "Nazwa firmy",
        "groupSizePrompt" : "Ile osób będzie uczestniczyć w szkoleniu?",
        "orMore" : "albo więcej",
        "countryPrompt" : "Kraj lub region",
        "isOnlinePrompt" : "Jesteś zainteresowany szkoleniem zdalnym czy w siedzibie firmy?",
        "inCompany" : "W siedzibie firmy",
        "online" : "Zdalnie",
        "datePrompt" : "Jaki termin Ci odpowiada?",
        "extraPrompt" : "Czy jest jeszcze coś, co chciałbyś dodać?",
        "submit" : "Prześlij"
    }
}