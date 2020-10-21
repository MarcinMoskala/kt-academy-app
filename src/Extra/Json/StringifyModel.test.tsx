import React from 'react';
import {objectModel} from "./ObjectModel";
import {modelToKotlin, modelToTS} from "./StringifyModel";

describe('Object to TypeScript model', () => {

    it('Writes properties and keeps them in an object', () => {
        const model = objectModel({name: "Some name"})!
        const written = modelToTS(model)
        expect(written).toEqual(`type YourObject = {
  name: string
}`)
    });

    it('Understands objects', () => {
        const model = objectModel({user: {name: "Marek", surname: "Markowski"}})!
        const written = modelToTS(model)
        expect(written).toEqual(`type YourObject = {
  user: {
    name: string
    surname: string
  }
}`)
    });

    it('Understands array of objects', () => {
        const model = objectModel({user: [{name: "Marek", surname: "Markowski"}]})!
        const written = modelToTS(model)
        expect(written).toEqual(`type YourObject = {
  user: {
    name: string
    surname: string
  }
}`)
    });

    it('Understands big and complex objects', () => {
        const model = objectModel(workshops)!
        const written = modelToTS(model)
        expect(written).toEqual(`type YourObject = {
  value: {
    key: string
    lang: string
    name: string
    subtitle: object
    shortDescription: string
    metaKeywords: string
    description: string
    secondDescription: object
    practicalTask: string
    practicalTaskIcon: string
    requirements: string
    tocMd: string
    icon: string
    certifiedByJb: boolean
    challenges: boolean
    trainer: {
      key: string
      fullName: string
      bioKey: string
      picture: string
      videos: string
      videoPosters: string
      promotionVideos: {
        ytCode: string
        posterImg: string
      }
      github: string
      twitter: string
      medium: string
      website: string
    }
    tags: string
    howLong: string
    basePrice: {
      company: {
        amount: number
        currency: string
      }
      companyPl: {
        amount: number
        currency: string
      }
      person: {
        amount: number
        currency: string
      }
      daysNumber: number
    }
  }
}`)
    });
})

describe('Object to Kotlin model', () => {

    it('Writes properties and keeps them in an object', () => {
        const model = objectModel({name: "Some name"})!
        expect(model).toEqual({name: "string"})
        const written = modelToKotlin('YourObject', model)
        expect(written).toEqual(`class YourObject(
  val name: String
)`)
    });

    it('Understands objects', () => {
        const model = objectModel({user: {name: "Marek", surname: "Markowski"}})!
        const written = modelToKotlin('YourObject', model)
        expect(written).toEqual(`class YourObject(
  val user: User
)

class User(
  val name: String,
  val surname: String
)`)
    });

    it('Understands array of objects', () => {
        const model = objectModel({user: [{name: "Marek", surname: "Markowski"}]})!
        const written = modelToKotlin('YourObject', model)
        expect(written).toEqual(`class YourObject(
  val user: List<User>
)

class User(
  val name: String,
  val surname: String
)`)
    });

    it('Understands big and complex objects', () => {
        const model = objectModel(workshops)!
        const written = modelToKotlin('YourObject', model)
        expect(written).toEqual(`class YourObject(
  val value: Value
)

class Value(
  val key: String,
  val lang: String,
  val name: String,
  val subtitle: Any?,
  val shortDescription: String,
  val metaKeywords: String,
  val description: String,
  val secondDescription: Any?,
  val practicalTask: String,
  val practicalTaskIcon: String,
  val requirements: List<String>,
  val tocMd: String,
  val icon: String,
  val certifiedByJb: Boolean,
  val challenges: Boolean,
  val trainer: Trainer,
  val tags: List<String>,
  val howLong: String,
  val basePrice: BasePrice
)

class BasePrice(
  val company: Company,
  val companyPl: CompanyPl,
  val person: Person,
  val daysNumber: Double
)

class Person(
  val amount: Double,
  val currency: String
)

class CompanyPl(
  val amount: Double,
  val currency: String
)

class Company(
  val amount: Double,
  val currency: String
)

class Trainer(
  val key: String,
  val fullName: String,
  val bioKey: String,
  val picture: String,
  val videos: List<String>,
  val videoPosters: List<String>,
  val promotionVideos: List<PromotionVideos>,
  val github: String,
  val twitter: String,
  val medium: String,
  val website: String
)

class PromotionVideos(
  val ytCode: String,
  val posterImg: String
)`)
    });
})

const workshops = JSON.parse('[{"key":"android","lang":"EN","name":"Kotlin for Android Developers","subtitle":null,"shortDescription":"Kotlin workshop that covers the whole material needed for efficient and idiomatic Kotlin development in Android.","metaKeywords":"Kotlin, workshop, Android, programming, coding, development, training","description":"A 3-day course that covers the whole material needed for efficient and idiomatic Kotlin development in Android. It starts with basics and dives deep down into advanced Kotlin features and best practices.","secondDescription":null,"practicalTask":"Write an Android application in Kotlin","practicalTaskIcon":"fab fa-android","requirements":["Professional experience in Android Development","A computer with Android Studio installed"],"tocMd":"\\n* Variety of Kotlin structures\\n* How to use functions at different levels\\n* How classes in Kotlin have changed and how it influences Android development\\n* What an object expression and object declaration are\\n* Functional programming features in Kotlin\\n* How to use Kotlin Android Extensions and KTX\\n* What exactly Data classes are\\n* How to use Sealed classes\\n* You will understand the Kotlin system in depth\\n* How to define and use Extension functions\\n* How to make an expressive and efficient collection processing in Kotlin\\n* What the Scope functions are and how to use them (let, apply, run, also, with, takeIf, takeUnless)\\n* Why inline classes are useful and important\\n* How to write Kotlin code in an idiomatic way\\n* What Kotlin code conventions and guidelines are\\n* Suspending functions\\n* Coroutine context and scope\\n* Job, Dispatchers, CoroutineExceptionHandler, CoroutineName\\n* Channel and Flow\\n\\nAdditionally, for an extra day, or if we manage to move faster:\\n* How to improve compiler suggestions using Kotlin Contracts\\n* What generic variance modifiers are, how to use them and what their limitations are\\n* How to create and use Kotlin property and interface delegates\\n* How to use and create Kotlin DSL\\n","icon":"fab fa-android","certifiedByJb":true,"challenges":true,"trainer":{"key":"marcin","fullName":"Marcin Moskała","bioKey":"trainerBio","picture":"/static/images/Marcin_Moskala.jpg","videos":["https://www.youtube.com/embed/UyTBXEZ983g","https://www.youtube.com/embed/8Mwy78Lg7jQ","https://www.youtube.com/embed/8QgWSIaa_QU","https://www.youtube.com/embed/22cjP5beLQA"],"videoPosters":["/static/images/yt_banners/coroutines.png","/static/images/yt_banners/kotlin_delegation.png","/static/images/yt_banners/next_level.png"],"promotionVideos":[{"ytCode":"UyTBXEZ983g","posterImg":"effective_multiplatform.png"},{"ytCode":"8Mwy78Lg7jQ","posterImg":"coroutines.png"},{"ytCode":"8QgWSIaa_QU","posterImg":"kotlin_delegation.png"},{"ytCode":"22cjP5beLQA","posterImg":"next_level.png"}],"github":"https://github.com/MarcinMoskala","twitter":"https://twitter.com/marcinmoskala","medium":"https://medium.com/@marcinmoskala","website":"https://marcinmoskala.com/"},"tags":["kotlin"],"howLong":"This workshop lasts 3 days in the basic form or 4 days to cover the entire scope.","basePrice":{"company":{"amount":4000,"currency":"EUR"},"companyPl":{"amount":12000,"currency":"PLN"},"person":{"amount":400,"currency":"EUR"},"daysNumber":3}},{"key":"refactoringToCleanCode","lang":"EN","name":"Refactoring to Clean Code","subtitle":"Effective Refactoring","shortDescription":"Enhance your Legacy Code towards Clean Code every day.","metaKeywords":"Refactoring, workshop, clean code","description":"Enhance your Legacy Code towards Clean Code every day. Feel the thrill of continuous code clean up and make it a daily habit of your team to maintain code quality.","secondDescription":null,"practicalTask":"Solve coding challenges","practicalTaskIcon":"fas fa-brain","requirements":["Professional experience as a developer","Computer with IntelliJ installed"],"tocMd":"### Part 1 - Cleaning Code in small steps\\n * Review of Legacy Code project\\n * It’s only one more \\"if\\" statement...\\n * Review of automated refactorings in IntelliJ\\n * Live refactoring in small steps\\n * Habits of personal effectiveness for code quality\\n * Clean Code \u0026 Pyramid of Refactoring\\n * SOLID Principles \u0026 Pyramid of Refactoring\\n\\n### Part 2 - Clean Code to ease extendability and testability\\n * Review of “Extended” Legacy Code project\\n * New Requirements + No Cleaning \u003d (More) Dirty Legacy Code\\n * More Requirements are coming...\\n * Live refactoring towards extraction of extension points\\n * Clean code is extendable code\\n * Habits of team effectiveness for code quality\\n * Implementation of new functionality using TDD","icon":"fas fa-chart-line","certifiedByJb":false,"challenges":false,"trainer":{"key":"wlodek","fullName":"Włodek Krakowski","bioKey":"wlodzimierzKrakowskiBio","picture":"/static/images/Wlodek_Krakowski.jpg","videos":null,"videoPosters":null,"promotionVideos":null,"github":"https://github.com/wlodekkr","twitter":"https://twitter.com/wlodekkr","medium":"https://medium.com/@wlodzimierz.krakowski","website":"https://www.linkedin.com/in/wlodek-krakowski/"},"tags":["bestpractices"],"howLong":"This workshop lasts 1 day, and 6-7 hours in total. It can also be conducted as 4 sessions of live-refactoring and discussions with the trainer, arranged twice a week for 2 weeks.","basePrice":{"company":{"amount":2000,"currency":"EUR"},"companyPl":{"amount":6000,"currency":"PLN"},"person":{"amount":150,"currency":"EUR"},"daysNumber":1}},{"key":"backend","lang":"EN","name":"Kotlin for developers","subtitle":null,"shortDescription":"Kotlin workshop that covers the whole material needed for efficient and idiomatic Kotlin development.","metaKeywords":"Kotlin, workshop, programming, backend, training","description":"A 3-day training concentrated on Kotlin JVM. Suitable both for writing pure Kotlin applications, as well as for using Kotlin in backend frameworks like Spring or Ktor. The workshop covers Kotlin exercises, best practices for backend, and core Kotlin features.","secondDescription":null,"practicalTask":"Solve coding challenges in Kotlin","practicalTaskIcon":"fas fa-brain","requirements":["Professional experience in Java or other OOP lang","Computer with IDEA IntelliJ installed"],"tocMd":"* Basic Kotlin structures\\n* Functions at different levels and a functional style\\n* Kotlin OO programming\\n* Data classes\\n* Sealed classes\\n* Object expression, object declaration and companion object\\n* Kotlin type system\\n* Extension functions\\n* Functional programming in Kotlin\\n* Collections and string processing\\n* Scope functions (let, apply, run, also, with, takeIf, takeUnless)\\n* Generic classes and functions, making own collection processing function\\n* Kotlin generic type parameter declarations and modifiers\\n* Kotlin property and interface delegates\\n* Reflection in Kotlin, and how to use Java reflection in Kotlin\\n* DSL usage and creation\\n* Interoperability between Kotlin and Java\\n* Basics of Kotlin coroutines\\n* Rules of the idiomatic Kotlin","icon":"fas fa-server","certifiedByJb":true,"challenges":true,"trainer":{"key":"marcin","fullName":"Marcin Moskała","bioKey":"trainerBio","picture":"/static/images/Marcin_Moskala.jpg","videos":["https://www.youtube.com/embed/UyTBXEZ983g","https://www.youtube.com/embed/8Mwy78Lg7jQ","https://www.youtube.com/embed/8QgWSIaa_QU","https://www.youtube.com/embed/22cjP5beLQA"],"videoPosters":["/static/images/yt_banners/coroutines.png","/static/images/yt_banners/kotlin_delegation.png","/static/images/yt_banners/next_level.png"],"promotionVideos":[{"ytCode":"UyTBXEZ983g","posterImg":"effective_multiplatform.png"},{"ytCode":"8Mwy78Lg7jQ","posterImg":"coroutines.png"},{"ytCode":"8QgWSIaa_QU","posterImg":"kotlin_delegation.png"},{"ytCode":"22cjP5beLQA","posterImg":"next_level.png"}],"github":"https://github.com/MarcinMoskala","twitter":"https://twitter.com/marcinmoskala","medium":"https://medium.com/@marcinmoskala","website":"https://marcinmoskala.com/"},"tags":["kotlin"],"howLong":"This workshop lasts 3 days","basePrice":{"company":{"amount":4000,"currency":"EUR"},"companyPl":{"amount":12000,"currency":"PLN"},"person":{"amount":400,"currency":"EUR"},"daysNumber":3}},{"key":"refactoringToPatterns","lang":"EN","name":"Refactoring to Patterns","subtitle":"Hands-On Workshop","shortDescription":"Make code architecture more extendable, readable, and testable by applying design patterns.","metaKeywords":"Refactoring, workshop, patterns","description":"Make code architecture more extendable, readable, and testable by applying design patterns.","secondDescription":null,"practicalTask":"Solve coding challenges","practicalTaskIcon":"fas fa-brain","requirements":["Professional experience as a developer","Computer with IntelliJ installed"],"tocMd":" * practice live refactoring towards design patterns\\n * learn about chosen design patterns\\n * understand how their software development process influences on code quality\\n * come up with ideas about adjustments to work organization to achieve cleaner code design\\n\\nCore ideas:\\n* practice of refactoring into the selected design\\npatterns\\n * understand the relation between outcome quality and\\nsetup of the development process\\n * inspire to experiment with quality by adjusting\\ndevelopment process\\n\\nSome important patterns we will cover: \\n * Interpreter\\n * Chain of Responsibility\\n * Template\\n * Bridge\\n * State\\n * Factory Method\\n * Abstract Factory\\n * Composite / Proxy - if the time allows\\n \\nThis workshop is a continuation of “Refactoring to Clean Code” training, and it is based\\non the assumption that attendees can perform some initial clean-up of the codebase. Such a\\nclean-up allows us to notice emerging design patterns out of the mess of legacy code.","icon":"fas fa-chart-line","certifiedByJb":false,"challenges":false,"trainer":{"key":"wlodek","fullName":"Włodek Krakowski","bioKey":"wlodzimierzKrakowskiBio","picture":"/static/images/Wlodek_Krakowski.jpg","videos":null,"videoPosters":null,"promotionVideos":null,"github":"https://github.com/wlodekkr","twitter":"https://twitter.com/wlodekkr","medium":"https://medium.com/@wlodzimierz.krakowski","website":"https://www.linkedin.com/in/wlodek-krakowski/"},"tags":["bestpractices"],"howLong":"This workshop normally lasts 2 days, but it can be conducted as the intensive 1-day training, or in 3 days with extra content.","basePrice":{"company":{"amount":3000,"currency":"EUR"},"companyPl":{"amount":9000,"currency":"PLN"},"person":{"amount":280,"currency":"EUR"},"daysNumber":2}},{"key":"coroutines","lang":"EN","name":"Kotlin Coroutines","subtitle":null,"shortDescription":"Workshop covering asynchronous programming in Kotlin using coroutines.","metaKeywords":"Kotlin, workshop, training, Android, programming, coding, development, coroutines, kotlin coroutines","description":"This is a 2-day workshop for experienced developers, that covers asynchronous programming in Kotlin using coroutines. It covers both build-in support for coroutines and dives deep into kotlinx.coroutines library.","secondDescription":null,"practicalTask":"Solve coding challenges in Kotlin","practicalTaskIcon":"fas fa-brain","requirements":["Fluent use of Kotlin","Computer with IDEA IntelliJ installed"],"tocMd":"* Styles of concurrence\\n* Sequence builders\\n* Continuation\\n* Understanding how suspension works\\n* Coroutine Context\\n* Interceptors and dispatchers\\n* Coroutine Scope\\n* Coroutine builders\\n* Structured concurrency\\n* Understanding Job\\n* Composing suspending functions\\n* Exceptions handling\\n* Shared mutable state and concurrency\\n* Channels\\n* Actors\\n* Flow\\n* Select expression\\n* UI programming with coroutines\\n* Reactive streams with coroutines\\n* Unit testing","icon":"fas fa-exchange-alt","certifiedByJb":true,"challenges":true,"trainer":{"key":"marcin","fullName":"Marcin Moskała","bioKey":"trainerBio","picture":"/static/images/Marcin_Moskala.jpg","videos":["https://www.youtube.com/embed/UyTBXEZ983g","https://www.youtube.com/embed/8Mwy78Lg7jQ","https://www.youtube.com/embed/8QgWSIaa_QU","https://www.youtube.com/embed/22cjP5beLQA"],"videoPosters":["/static/images/yt_banners/coroutines.png","/static/images/yt_banners/kotlin_delegation.png","/static/images/yt_banners/next_level.png"],"promotionVideos":[{"ytCode":"UyTBXEZ983g","posterImg":"effective_multiplatform.png"},{"ytCode":"8Mwy78Lg7jQ","posterImg":"coroutines.png"},{"ytCode":"8QgWSIaa_QU","posterImg":"kotlin_delegation.png"},{"ytCode":"22cjP5beLQA","posterImg":"next_level.png"}],"github":"https://github.com/MarcinMoskala","twitter":"https://twitter.com/marcinmoskala","medium":"https://medium.com/@marcinmoskala","website":"https://marcinmoskala.com/"},"tags":["kotlin"],"howLong":"This workshop takes 2 days. We also offer slimmed down version that lasts 1 day. ","basePrice":{"company":{"amount":3000,"currency":"EUR"},"companyPl":{"amount":9000,"currency":"PLN"},"person":{"amount":280,"currency":"EUR"},"daysNumber":2}},{"key":"effectiveKotlin","lang":"EN","name":"Effective Kotlin","subtitle":"BEST PRACTICES","shortDescription":"Kotlin workshop directed to experienced Kotlin developers, focused on the best practices","metaKeywords":"Kotlin, workshop, training, effective Kotlin, Android, programming","description":"During this 2 or 3-day workshop for experienced Kotlin developers, we\u0027ll dive deeply into Kotlin\u0027s best practices and idiomatic Kotlin use. We\u0027ll also talk about more general concepts like readability, abstraction design or contract setting. ","secondDescription":"The workshop is based on the Effective Kotlin book. The content is well thought out and consulted with many Kotlin developers.","practicalTask":"Solve coding challenges in Kotlin","practicalTaskIcon":"fas fa-brain","requirements":["Fluent use of Kotlin","Computer with IDEA IntelliJ installed"],"tocMd":"In the first 2 days, we cover general best practices and class design, and the 3rd day is dedicated to code efficiency.\\n\\n### The most important best practices we\u0027ll be covering are:\\n#### Safety\\n* Limit mutability\\n* Eliminate platform types as soon as possible\\n* Do not expose inferred types\\n* Prefer composition over inheritance\\n* Make it clear that top-level functions are not member functions\\n\\n#### Readability\\n* Design for readability\\n* Use operator overloading methods as their names indicate\\n* Consider naming arguments\\n* Avoid returning or operating on Unit?\\n* Specify variable type when it is not clear\\n* Consider referencing receiver explicitly\\n\\n#### Reusability\\n* Do not repeat knowledge\\n* Do not repeat common algorithms\\n* Reuse between different platforms by extracting common modules\\n    \\n#### Design abstractions\\n* Each function should be written in terms of a single level of abstraction\\n* Define abstractions\\n* Respect abstraction contract\\n* Restrict visibility\\n* Use abstraction to protect code against changes\\n* Consider wrapping external API\\n\\n#### Objects creation\\n* Consider factory functions instead of constructors\\n* Consider primary constructor with named optional arguments\\n* Consider defining DSL for complex object creation\\n    \\n#### Class design\\n* Use data modifier to represent a bundle of data\\n* Use function types instead of interfaces to pass operations and actions\\n* Do not use properties to express behavior\\n* Respect contract of equals\\n* Respect contract of hashCode\\n* Respect contract of compareTo\\n* Respect contract of arithmetic operators\\n\\n#### Make it cheap\\n* Avoid unnecessary object creation\\n* Consider inline modifier for higher-order functions\\n* Eliminate obsolete object references\\n* Use tail recursion to achieve efficient recurrence\\n\\n#### Efficient collection processing\\n* Prefer Sequence for bigger collections with more than one processing step\\n* Consider Arrays with primitives for performance critical processing\\n* Consider using mutable collections\\n\\n### On this way, we\u0027ll also review more advanced topics including:\\n* Collections\\n* Delegates\\n* Platform types\\n* Interoperability with Java\\n* Typing system\\n* Generics\\n* Operator overloading\\n* DSL creation\\n* Functional programming\\n### During the 3rd day we additionally cover:\\n* Inline classes\\n* Computational complexity","icon":"fas fa-chart-line","certifiedByJb":true,"challenges":true,"trainer":{"key":"marcin","fullName":"Marcin Moskała","bioKey":"trainerBio","picture":"/static/images/Marcin_Moskala.jpg","videos":["https://www.youtube.com/embed/UyTBXEZ983g","https://www.youtube.com/embed/8Mwy78Lg7jQ","https://www.youtube.com/embed/8QgWSIaa_QU","https://www.youtube.com/embed/22cjP5beLQA"],"videoPosters":["/static/images/yt_banners/coroutines.png","/static/images/yt_banners/kotlin_delegation.png","/static/images/yt_banners/next_level.png"],"promotionVideos":[{"ytCode":"UyTBXEZ983g","posterImg":"effective_multiplatform.png"},{"ytCode":"8Mwy78Lg7jQ","posterImg":"coroutines.png"},{"ytCode":"8QgWSIaa_QU","posterImg":"kotlin_delegation.png"},{"ytCode":"22cjP5beLQA","posterImg":"next_level.png"}],"github":"https://github.com/MarcinMoskala","twitter":"https://twitter.com/marcinmoskala","medium":"https://medium.com/@marcinmoskala","website":"https://marcinmoskala.com/"},"tags":["kotlin","bestpractices"],"howLong":"This full workshop lasts 3 days, but we also offer tailor-made options that can take 1 or 2 days.","basePrice":{"company":{"amount":4000,"currency":"EUR"},"companyPl":{"amount":12000,"currency":"PLN"},"person":{"amount":400,"currency":"EUR"},"daysNumber":3}}]')