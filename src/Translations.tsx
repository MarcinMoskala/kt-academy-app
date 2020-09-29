import React, {useContext} from "react";
import {useLocation} from 'react-router-dom'

export const LangContext = React.createContext('light');

export const Lang = {
    PL: "PL",
    EN: "EN"
}

export function useTranslations() {
    return useLang().key === Lang.PL ? PL_desc : EN_desc
}

export function useLang(): { key: string, pathPrefix: string, flag: string } {
    let key = useContext(LangContext);
    return {
        key: key,
        pathPrefix: key === Lang.PL ? "/pl" : "",
        flag: key === Lang.PL ? "/images/pl-flag.png" : "/images/uk-flag.png"
    }
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
    "tagsSEO": "Kotlin, workshop, training, Android, programming, coding, development, java, move to kotlin, java to kotlin",
    "title": "Kt. Academy - workshops with focus on best practices",
    "menu": {
        "home": "Home",
        "offer": "Offer",
        "whyUs": "Why Us",
        "trainer": "Trainer",
        "materials": "Materials",
        "workshops": "Workshops",
        "upcomingWorkshops": "Workshops",
        "privateWorkshops": "Workshops",
        "articles": "Articles",
        "generate": "Generate DTO",
        "workshopMaterial": "Topics",
        "register": "Register",
        "contact": "Contact"
    },
    "flag": {
        "imgLink": "/images/uk-flag.png",
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
        "kotlinButton": "Check the most popular workshops",
        "bestPracticesTitle": "Best practices trainings",
        "bestPracticesDesc": "Workshops for all kinds of developers, teaching best practices, design patterns and refactoring.",
        "bestPracticesButton": "Check the most popular workshops"
    },
    "whyUs": {
        "title": "Why training with us?",
        "subtitle": "Our workshops are conducted by world-class experts, focus on best practices and made as practical as possible.",
        "practicalTitle": "Learn by doing",
        "practicalDesc1": "We support learning with practical exercises, programming puzzlers and challenges.",
        "practicalDesc2": "Check examples to know what to expect from the workshop.",
        "puzzlers": "Puzzlers",
        "puzzlersButton": "Check example puzzler!",
        "challenges": "Coding challenges",
        "challengesButton": "Check example challenge!",
        "app": "Build practical applications ",
        "bestTitle": "Learn from the best"
    },
    "trainerBio": "Marcin Moskała is an experienced Android developer, teacher and <a href=\"https://www.jetbrains.com/company/partners/#countries=Poland&profession=TrainingPartner&speciality=Kotlin&technologies=Kotlin\"> an official Jetbrains' Kotlin training partner</a>. He is the founder of <a href=\"https://kt.academy\"> Kt. Academy</a>, author of the books <a href=\"https://leanpub.com/effectivekotlin/\"> \"Effective Kotlin\"</a> and <a href=\"https://www.packtpub.com/application-development/android-development-kotlin\"> \"Android Development with Kotlin\"</a>, and an active programming community member. He is also the main author on <a href=\"https://blog.kotlin-academy.com\"> the biggest medium publication about Kotlin </a> and a speaker invited to many programming conferences.",
    "wlodzimierzKrakowskiBio": "Experienced developer, trainer and a speaker on international conferences. Specialised in handling and refactoring legacy code.",
    "certificateTitle": "One of the first certified Kotlin training worldwide",
    "certificateDesc": "You will be trained by an expert who is an official JetBrains' Kotlin training partner. The quality of his workshops was checked and certified by the creators of the Kotlin language itself.",
    "materialsSection": {
        "title": "Professional training materials",
        "book": "The book with all the slides to make it easier to start using new knowledge after the workshop - everything in one place to recall new functionalities.",
        "cheatsheet": "Cheatsheet in a printed, laminated form. Now you can have all the essentials at hand — it is the best daily support for a Kotlin developer.",
        "tasks": "A lot of tasks and questions to practice during the workshop. We do our best to make the training as practical as possible."
    },
    "testimonials": {
        "subtitle": "We've helped over 300 developers from more than 40 companies around the world in a smooth transition to Kotlin",
        "saramak": "\"On this workshop, I not only systematized knowledge about Kotlin syntax but also, thanks to Marcin, I changed my way of thinking about problem-solving to functional way - I got a new tool that I can use at work on a daily basis. It seems to me that whole training is focused on immediate use of new knowledge in daily work. Big +\"",
        "nazaruk": "\"I have participated in great Kotlin for Android Developers training, with extremely competent Marcin Moskala from Kt. Academy as a trainer. It was an intensive 3-days Kotlin workshop, ended with a quite difficult and thorough exam. With experience and knowledge under my belt acquired in this course, I feel confident about my future as an Android Developer.\"",
        "grajewski": "\"Very good workshop. Perfect for developers that want to move easily from Java to Kotlin. During the workshop, we did plenty of exercises that enabled checking new knowledge in practice.\"",
        "button": "Book a practical workshop tailored to your needs"
    },
    "contact": {
        "title": "Let's talk!",
        "stayInTouch": "Stay in touch!",
        "pricing": {
            "description": "Tell us more about your needs and the level of your team, so we can prepare the adjusted offer and send you the right pricing.",
            "button": "Request workshop"
        },
        "twitter": {
            "title": "Follow us on Twitter",
            "description": "We have a community of more than 3000 followers and we only post programming-related content."
        },
        "mail": {
            "title": "Write an email",
            "description": "We are happy to talk about our workshops and adjust them to your needs. Contact us if you have any questions.",
            "button": "Contact Us"
        },
        "newsletter": {
            "title": "Sign up to our newsletter",
            "description": "Stay updated with our articles and workshops. We only send programming-related content.",
            "button": "Sign up"
        }
    },
    "footerContact": "Contact Us:",
    "privacyPolicy": "Privacy policy",
    "workshopsList": {
        "offerDesc": "You can choose from the proposals below, or we can prepare something tailored to your needs. We conduct both in-company and online trainings. ",
        "button": "More information",
        "otherOption": "We list only the most popular workshops on our website. If you don't see the course you need or require a customized version of it, please email us: ",
    },
    "workshopPage": {
        "knowledgeSources": {
            "title": "On the workshop you will",
            "lecture": "Learn from lecture supported by slides",
            "exercises": "Complete practical exercises",
            "puzzlers": "Solve puzzlers"
        },
        "titleToc": "During the workshop we cover:",
        "titleRequirements": "Requirements",
        "titleHowLong": "How long does it take?",
        "registration": {
            "title": "Register",
            "private": {
                "buttonText": "Private workshop",
                "explanation": 'Choose this option if you need a workshop for your team or company. The basic price is {workshop_price} for the group for {days_num} days.',
            },
            "public": {
                "buttonText": "Open online workshop",
                "explanation": 'Choose this option if you need a workshop for yourself or for a small group of people. The basic price is {workshop_person_price} per person for {days_num} days.',
            }
        }
    },
    "puzzler": {
        "descriptionSEO": "Check exemplary puzzlers that you will be solving during the Kt. Academy workshops. We believe that training should be as practical as possible.",
        "tagsSEO": "Kotlin, workshop, Android, programming, coding, development, puzzler, exercise, practical workshop",
        "title": "Learn by doing",
        "subtitle": "Train new Kotlin skills by solving practical puzzlers",
        "whatArePuzzlers": "What are the puzzlers?",
        "description": "Puzzlers are tricky programming challenges with often surprising answers. They show how bad practices can lead to problems.",
        "examplesTitle": "Exemplary puzzlers",
        "whatPrint": "What will it print?",
        "whatDisplay": "What does it display?",
        "showAnswers": "Show the answer and an explanation",
        "correctAnswer": "Correct answer",
        "explanation": "Explanation",
        "puzzle1Title": "Order of nullable operators",
        "puzzle1Answers": {
            "a": "a) 3",
            "b": "b) 5",
            "c": "c) 2",
            "d": "d) 0"
        },
        "puzzle1Explanation": "Elvis operator has lower precedence than + so plus is evaluated first and y lend on the right side of Elvis operator. Use brackets to correct this.",
        "puzzle2Title": "Extensions are resolved statically",
        "puzzle2Answers": {
            "a": "a) Doesn't compile",
            "b": "b) Runtime error",
            "c": "c) \"c\"",
            "d": "d) \"d\""
        },
        "puzzle2Explanation": "This example will print \\\"c\\\" because the extension function being called depends only on the declared type of the parameter c, which is the C class.</p>\"+\n            \"<p>Extensions do not actually modify classes they extend. By defining an extension you do not insert new members into a class, but merely make new functions callable with the dot-notation on variables of this type."
    },
    "challenge": {
        "descriptionSEO": "Check exemplary challenge that you will be solving during the Kt. Academy workshops. We believe that training should be as practical as possible.",
        "tagsSEO": "Kotlin, workshop, Android, programming, coding, development, puzzler, exercise, practical workshop",
        "title": "Learn by doing",
        "subtitle": "Train new Kotlin skills by solving practical challenges",
        "whatAreChallenges": "What are the challenges?",
        "description": "Small programming tasks that require you to implement a function or a class in Kotlin. Thanks to them, you can check in practice if you understand the material correctly and train it to be able to use it immediately after the workshop. All challenges are verified by unit tests.",
        "examplesTitle": "Exemplary challenges"
    },
    "form": {
        "private": {
            "title": "Private workshop request",
            "intro": "Fill this form to request private workshop [{workshop_name}]({workshop_link}) for your company.",
            "inCompanyWarning": "In the case of a workshop outside of Warsaw, we will have to add travel and accommodation costs to the price."
        },

        "public": {
            "title": "Open workshop request",
            "intro": "Fill this form to request open workshop [{workshop_name}]({workshop_link}). You will be added to the waiting list of developers interested in this workshop. We will contact you once we have gathered enough attendees in your time zone."
        },

        "namePrompt": "Your name",
        "emailPrompt": "Your email",
        "companyNamePrompt": "Company name",
        "groupSizePrompt": "For how many people do you need this workshop?",
        "orMore": "or more",
        "justMe": "Just me",
        "countryPrompt": "Country or region",
        "datePrompt": "What dates suit you best?",
        "extraPrompt": "Is there anything else you would like to share?",
        "privateGroupSizePrompt": "How many developers would you like to register?",
        "dialogSent": "Request sent",
        "dialogError": "A problem occurred, please send later",

        "isOnline": {
            "question": "Are you interested in online or in-company training?",
            "inCompany": "In-company",
            "online": "Online",
        },

        "registerKind": {
            "question": "Who would you like to register?",
            "myself": "Myself",
            "developerCompany": "A developer from my company",
            "myselfAndGroupCompany": "Myself and other developers from my company",
            "groupCompany": "Developers from my company",
        },

        "invoiceTo": {
            "question": "To whom issue the invoice?",
            "company": "The company I work for",
            "privateCompany": "My own company",
            "person": "Myself",
        },

        "developerExperience": {
            "questionMyself": "What is your professional experience as a developer?",
            "questionOther": "What is the registered person's experience as a developer?",
            "no": "No experience",
            "junior": "Junior developer",
            "mid": "Developer",
            "senior": "Senior developer",
        },

        "priceAcceptance": {
            "question": "The base price for this workshop is 400 EUR per person for 3 days. Does it work for you?",
            "ok": "Yes",
            "discountNeeded": "This is too much for me, I need a discount",
            "wayTooMuch": "Sorry, but my budget is less than half of that",
        },

        "required": "Required",
        "invalidEmail": "Invalid email",
        "submit": "Submit",

        "requestOpenInsteadInfo": "This form should be used to request private workshops for companies. If it is just you or a small group of people, we suggest to use [this form]({openFormLink}) to request an open online workshop.",
        "beginnerInfo": "We are sorry, but this workshop is for developers with professional experience. We've collected our pieces of advice for new developers in [this article](https://blog.kotlin-academy.com/learn-programming-in-9-months-eac3f049c5bc). If you want to learn Kotlin, our recommendations are [here](https://blog.kotlin-academy.com/best-kotlin-free-online-courses-5838cb7063c6).",
        "noVatIdInfo": "We may not be able to offer you any discount as for a private person we will have to pay an additional tax of 23%.",
    },
    "generate": {
        "title": "Generate DTO",
        "pastePrompt": "Paste your code here: ",
        "dtoName": "DTO name: ",
        "dtoSuffix": "(or) suffix: ",
        "generateButton": "Generate",
    },
    "errorMessage": "An error occurred. We are sorry. You can contact us using contact@kt.academy"
}

const PL_desc = {
    "description": "Kt. Academy - Uczenie to nasza pasja. Jeśli chcesz przejść z języka Java na Kotlin lub doskonalić umiejętności programowania w Kotline Twojego zespołu, nasze szkolenia są zdecydowanie dla Ciebie. Sprawdź warsztaty: Kotlin dla programistów Android, Effective Kotlin, Kotlin Coroutines, Kotlin dla programistów backend. Skupiamy się na najlepszych praktykach i na praktyce.",
    "tagsSEO": "Kotlin, warsztat, szkolenie, Android, programowanie, kodowanie, development, java, przejść na kotlin, java na kotlin",
    "title": "Kt. Academy - Szkolenia skupiające się na najlepszych praktykach",
    "menu": {
        "home": "Strona Główna",
        "offer": "Oferta",
        "whyUs": "Dlaczego my?",
        "workshopMaterial": "Zagadnienia",
        "trainer": "Trener",
        "materials": "Materiały",
        "workshops": "Warsztaty",
        "upcomingWorkshops": "Warsztaty",
        "privateWorkshops": "Warsztaty",
        "articles": "Artykuły",
        "generate": "Generuj DTO",
        "register": "Rejestracja",
        "contact": "Kontakt"
    },
    "flag": {
        "imgLink": "/images/pl-flag.png",
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
        "kotlinButton": "Sprawdź najpopularniejsze warsztaty",
        "bestPracticesTitle": "Warsztaty z dobrych praktyk",
        "bestPracticesDesc": "Warsztaty dla programistów różnych języków i technologii, dedykowane jakości kodu, wzorcom projektowym, refaktoryzacji oraz najlepszym praktykom.",
        "bestPracticesButton": "Sprawdź najpopularniejsze warsztaty"
    },
    "whyUs": {
        "title": "Dlaczego warto szkolić się z nami?",
        "subtitle": "Nasze warsztaty prowadzone są przez ekspertów światowej klasy, nastawione są na dobre praktyki i skupiają się na ćwiczeniach praktycznych.",
        "practicalTitle": "Ucz się poprzez praktyczne zadania",
        "bestTitle": "Ucz się od najlepszych",
        "practicalDesc1": "Wspieramy naukę poprzez praktyczne ćwiczenia, puzzlery i wyzwania programistyczne.",
        "practicalDesc2": "Sprawdź przykłady, żeby wiedzieć czego spodziewać się na warsztacie.",
        "puzzlers": "Puzzlery",
        "puzzlersButton": "Sprawdź przykładowy puzzler!",
        "challenges": "Wyzwania programistyczne",
        "challengesButton": "Sprawdź przykładowe wyzwanie!",
        "app": "Tworzenie praktycznych aplikacji"
    },
    "trainerBio": "Marcin Moskała jest doświadczonym programistą Android, nauczycielem Kotlina z zamiłowania i <a href=\"https://www.jetbrains.com/company/partners/#countries=Poland&profession=TrainingPartner&speciality=Kotlin&technologies=Kotlin\"> oficjalnym partnerem szkoleniowym Jetbrains' w zakresie szkoleń z języka Kotlin</a>. Jest założycielem <a href=\"https://kt.academy\"> Kt. Academy</a>, autorem książek <a href=\"https://leanpub.com/effectivekotlin/\"> \"Effective Kotlin\"</a> i <a href=\"https://www.packtpub.com/application-development/android-development-kotlin\"> \"Android Development with Kotlin\"</a>, a także aktywnym członkiem społeczności programistycznej. Jest też głównym autorem artykułów na <a href=\"https://blog.kotlin-academy.com\"> największej publikacji medium o Kotlinie </a> oraz prelegentem zapraszanym na wiele programistycznych konferencji.",
    "wlodzimierzKrakowskiBio": "Jestem trenerem technicznym oraz prelegentem na konferencjach, specjalizującym się w zagadnieniach pracy z kodem zastanym i długiem technicznym poprzez techniki refaktoryzacji kodu. Mieszkam w Krakowie, ale często podróżuję po Polsce, Europie i świecie, aby wspierać moich klientów w ich działaniach.",
    "certificateTitle": "Jeden z pierwszych certyfikowanych treningów z Kotlina",
    "certificateDesc": "Jakość tego warsztatu została sprawdzona i certyfikowana przez twórców języka Kotlin. Szkolić Was będzie trener, który jest oficjalnym partnerem JetBrains w zakresie szkoleń z języka Kotlin.",
    "materialsSection": {
        "title": "Profesjonalne materiały szkoleniowe",
        "book": "Książka ze wszystkimi slajdami, żeby ułatwić korzystanie z nowej wiedzy w praktyce, od razu po zakończeniu warsztatu - cały materiał w jednym miejscu.",
        "cheatsheet": "Kotlin cheatsheet w drukowanej i laminowanej formie. Teraz będziesz mieć najważniejsze elementy pod ręką  - to najlepsze codzienne wsparcie programisty Kotlin.",
        "tasks": "Dużo zadań i pytań do ćwiczeń praktycznych. Staramy się, aby nasze warsztaty były tak praktyczne, jak to tylko możliwe."
    },
    "testimonials": {
        "subtitle": "Pomogliśmy ponad 300 programistom z ponad 40 firm na całym świecie w przejściu na język Kotlin",
        "saramak": "\"Na warsztacie nie tylko usystematyzowałem sobie wiedzę ze składni języka kotlin, ale dzięki Marcinowi przestawiłem swoje myślenie o możliwości rozwiązania problemu w funkcjonalny sposób - dostałem do ręki nowe narzędzie, które moge wykorzystać w codziennej pracy. Wydaje mi się, że całe szkolenie jest nastawione na natychmiastowy zwrot zdobytej wiedzu w codziennej pracy. Duży +\"",
        "nazaruk": "\"Kotlin dla programistów Android to świetne warsztaty, prowadzone przez niezwykle kompetentnego trenera z Kt. Academy, Marcina Moskałę. To był intensywny, 3-dniowy kurs Kotlina, zakończony niełatwym egzaminem. Jestem pewna, że z wiedzą zdobytą na kursie, oraz certyfikatem wydanym po zdanym egzaminie mogę z optymizmem spojrzeć na swoją przyszłość jako Android Developer.\"",
        "grajewski": "\"Bardzo dobre szkolenie. W sam raz dla programistów, którzy w łatwy sposób chcą przenieść się z Javy na Kotlina. Szkolenie zawiera także ćwiczenia, które umożliwiają sprawdzenie nowej wiedzy w praktyce.\"",
        "button": "Zarezerwuj szkolenie dopasowane do Twoich potrzeb"
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
            "description": "Zrzeszamy społeczność ponad 3000 obserwujących i publikujemy tylko treści związane z programowaniem"
        },
        "mail": {
            "title": "Skontaktuj się z nami",
            "description": "Z chęcią opowiemy o naszych warsztatach i dostosujemy je do Twoich potrzeb. Napisz, jeżeli masz jakieś pytania.",
            "button": "Napisz do nas"
        },
        "newsletter": {
            "title": "Zapisz się do newslettera",
            "description": "Bądź na bieżąco z naszymi artykułami i szkoleniami. Wysyłamy tylko informacje związane z programowaniem.",
            "button": "Zapisz się"
        }
    },
    "footerContact": "Napisz do nas:", "privacyPolicy": "Polityka prywatności",
    "workshopsList": {
        "button": "Więcej informacji",
        "otherOption": "Na stronie umieszczamy najpopularniejsze warsztaty. Jeśli nie widzisz szkolenia, które Cię interesuje lub chciałbyś dopasować materiał do potrzeb i poziomu zespołu, skontaktuj się z nami: ",
    },
    "workshopPage": {
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
            "title": "Wyślij zgłoszenie",
            "private": {
                "buttonText": "Szkolenie prywatne",
                "explanation": 'Wybierz tę opcję, jeśli potrzebujesz szkolenia dla swojego zespołu lub firmy. Podstawowa cena w Polsce i w języku polskim to {workshop_price_pl} za grupę (w innym przypadku {workshop_price}) za {days_num} dni szkolenia.',
            },
            "public": {
                "buttonText": "Szkolenie otwarte online",
                "explanation": 'Wybierz tę opcję, jeśli potrzebujesz szkolenia dla siebie lub małej grupy. Podstawowa cena to {workshop_person_price} za osobę za {days_num} dni.',
            }
        }
    },
    "puzzler": {
        "descriptionSEO": "Sprawdź przykładowe puzzlery, które programiści rozwiązują na warsztatach Kt. Academy. Wierzymy, że szkolenie powinno być tak praktyczne, jak to tylko możliwe.",
        "tagsSEO": "Kotlin, warsztat, Android, programowanie, ćwiczenia Kotlin, puzzler, wyzwania programistyczne",
        "title": "Ucz się przez praktykę",
        "subtitle": "Rozwiąż Kotlinowe puzzlery",
        "whatArePuzzlers": "Co to są puzzlery?",
        "description": "Puzzlery to podchwytliwe programistyczne wyzwania, z często zaskakującymi odpowiedziami. Pokazują, jak złe praktyki mogą prowadzić do problemów.",
        "examplesTitle": "Przykładowe puzzlery",
        "whatPrint": "Co zostanie wydrukowane?",
        "whatDisplay": "Co zostanie wyświetlone?",
        "showAnswers": "Pokaż odpowiedź i wyjaśnienie",
        "correctAnswer": "Poprawna odpowiedź",
        "explanation": "Wyjaśnienie",
        "puzzle1Title": "Kolejność",
        "puzzle1Answers": {
            "a": "a) 3",
            "b": "b) 5",
            "c": "c) 2",
            "d": "d) 0"
        },
        "puzzle1Explanation": "Jest to programistyczny odpowiednik równania 1 + 2 * 3 = ?. Operator Elvisa ma niższy priorytet niż plus, w związku z czym będzie on wykonany później. Mylący jest tutaj brak spacji. Używaj nawiasów, nie białych znaków.",
        "puzzle2Title": "Funkcje rozszerzające",
        "puzzle2Answers": {
            "a": "a) Doesn't compile",
            "b": "b) Runtime error",
            "c": "c) c",
            "d": "d) d"
        },
        "puzzle2Explanation": "Zostanie wydrukowane c ze względu na to, czym są funkcje rozszerzające - są zwykłymi funkcjami, a receiver (tutaj C i D) jest pierwszym parametrem. Zachowywać się więc będą tak, jak byśmy mieli 2 funkcje statyczne foo z różnymi parametrami. To, która z nich zostanie ostatecznie wybrana, będzie zależeć od tego jaki jest typ przekazanej wartości. Zostanie to określone statycznie w czasie kompilacji."
    },
    "challenge": {
        "descriptionSEO": "Sprawdź przykładowe wyzwania, które programiści rozwiązują na warsztatach Kt. Academy. Wierzymy, że szkolenie musi być tak praktyczne, jak to tylko możliwe.",
        "tagsSEO": "Kotlin, warsztat, Android, programowanie, ćwiczenia Kotlin, puzzler, wyzwania programistyczne",
        "title": "Ucz się przez praktykę",
        "subtitle": "Wyćwicz nowe umiejętności rozwiązując programistyczne wyzwania",
        "whatAreChallenges": "Co to są wyzwania programistyczne?",
        "description": "Małe programistyczne zadania, które wymagają zaimplementowania funkcji lub klasy w języku Kotlin. Dzięki temu możesz sprawdzić w praktyce czy poprawnie rozumiesz materiał z kursu i wyćwiczyć to tak, aby być w stanie używać nowych umiejętności od razu po warsztacie. Wszystkie wyzwania zostały zweryfikowane przez testy jednostkowe.",
        "examplesTitle": "Przykładowe wyzwania"
    },

    "form": {
        "private": {
            "title": "Szkolenie prywatne",
            "intro": "Wypełnij ten formularz aby zgłosić grupę na prywatne szkolenie [{workshop_name}]({workshop_link}).",
            "inCompanyWarning": "W przypadku szkoleń poza Warszawą do ceny zostaną dodane koszty dojazdu i zakwaterowania"
        },

        "public": {
            "title": "Szkolenie otwarte online",
            "intro": "Wypełnij ten formularz, aby zapisać się na otwarte szkolenie online [{workshop_name}]({workshop_link}). Zostaniesz umieszczony na liście oczekujących zainteresowanych tym warsztatem. Skontaktujemy się z Tobą kiedy zbierze się odpowiednia liczba osób do utworzenia grupy i przeprowadzenia kursu."
        },

        "namePrompt": "Twoje imię",
        "emailPrompt": "Twój email",
        "companyNamePrompt": "Nazwa firmy",
        "groupSizePrompt": "Ile osób będzie uczestniczyć w szkoleniu?",
        "orMore": "albo więcej",
        "justMe": "Tylko ja",
        "countryPrompt": "Kraj lub region",
        "datePrompt": "Jaki termin Ci odpowiada?",
        "extraPrompt": "Czy jest jeszcze coś, co chciałbyś dodać?",
        "privateGroupSizePrompt": "Ilu programistów chciałbyś/chciałabyś zarejestrować?",
        "dialogSent": "Zgłoszenie wysłane",
        "dialogError": "Wystąpił problem, wyślij później",

        "isOnline": {
            "question": "Jesteś zainteresowany szkoleniem zdalnym czy w siedzibie firmy?",
            "inCompany": "W siedzibie firmy",
            "online": "Zdalnie",
        },

        "registerKind": {
            "question": "Kogo chcesz zarejestrować?",
            "myself": "Tylko siebie",
            "developerCompany": "Programistę z mojej firmy",
            "myselfAndGroupCompany": "Siebie oraz innych programistów z mojej firmy",
            "groupCompany": "Innych programistów z mojej firmy",
        },

        "invoiceTo": {
            "question": "Na kogo będzie wystawiana faktura?",
            "company": "Na firmę, dla której pracuję",
            "privateCompany": "Na moją własną firmę",
            "person": "Na mnie",
        },

        "developerExperience": {
            "questionMyself": "Jakie jest Twoje doświadczenie w pracy jako programista?",
            "questionOther": "Jakie jest doświadczenie zapisywanych osób w pracy jako programiści?",
            "no": "Brak doświadczenia",
            "junior": "Junior developer",
            "mid": "Developer",
            "senior": "Senior developer",
        },

        "priceAcceptance": {
            "question": "Podstawowa cena tego szkolenia to {price} za osobę za {days_num} dni. Czy Ci to odpowiada?",
            "ok": "Tak",
            "discountNeeded": "To dla mnie za dużo, potrzebuję zniżki",
            "wayTooMuch": "Mój budżet to mniej niż połowa tej ceny",
        },

        "required": "Pole wymagane",
        "invalidEmail": "Niepoprawny adres email",
        "submit": "Wyślij",

        "requestOpenInsteadInfo": "Dla mniejszych grup sugerujemy warsztaty otwarte, gdzie cena ustalona jest od osoby. Aby zapisać się na takie szkolenie użyj [tego formularza]({openFormLink}).",
        "beginnerInfo": "Niestety, ale to szkolenie jest skierowane do doświadczonych programistów. W naszej ofercie nie posiadamy warsztatów dla początkujących. Nasze rady jak zacząć naukę programowania zebraliśmy [tutaj](https://blog.kotlin-academy.com/learn-programming-in-9-months-eac3f049c5bc). Jeśli natomiast Twoim celem jest nauczenie się języka Kotlin, to [w tym artykule](https://blog.kotlin-academy.com/best-kotlin-free-online-courses-5838cb7063c6) znajdziesz polecane przez nas darmowe kursy.",
        "noVatIdInfo": "Możliwe, że nie będziemy w stanie zaoferować Ci żadnej zniżki, ponieważ w przypadku osoby prywatnej jesteśmy zobligowani zapłacić dodatkowy podatek w wysokości 23%.",
    },
    "generate": {
        "title": "Generuj DTO",
        "pastePrompt": "Wklej swój kod tutaj: ",
        "dtoName": "Nazwa DTO: ",
        "dtoSuffix": "(albo) suffix: ",
        "generateButton": "Generuj",
    },
    "errorMessage": "Wystąpił błąd. Przykro nam. Możesz się z nami skontaktować przez email contact@kt.academy"
}
