import React from 'react';
import Header, {Width} from "../../Section/Header/Header";
import FooterSection from "../../Section/FooterSection";
import "../../Utils";
import {useTranslations} from "../../Translations";
import ChallengeHeaderBg from "../../Section/Header/background-img/7-1920x702.png"
import TestimonialsSection from "./Testimonials/TestimonialsSection";
import KotlinPlayground from "react-kotlin-playground/es";
import {registerPage} from "../../Utils";

const challenges = [`
// Fibonacci number that starts from 1 and 1 (fib(0) == 1, fib(1) == 1, fib(2) == 2, fib(3) == 3, fib(4) == 5, fib(5) == 8)
// https://en.wikipedia.org/wiki/Fibonacci_number
fun fib(n: Int): Int = TODO()

fun main() {
    fib(0) shouldEquals 1
    fib(1) shouldEquals 1
    fib(2) shouldEquals 2
    fib(3) shouldEquals 3
    fib(4) shouldEquals 5
    fib(5) shouldEquals 8
    fib(6) shouldEquals 13
    fib(7) shouldEquals 21
    fib(8) shouldEquals 34
    fib(9) shouldEquals 55
    fib(10) shouldEquals 89
}

infix fun <T> T.shouldEquals(other: T) {
    if (this != other) throw AssertionError("Value $this not equal to $other")
}
`, `
interface Person {
    val name: String
    val age: Int
    val canBuyAlcohol: Boolean

    fun helloText(): String

    fun cheerText(person: Person): String
}

// TODO: Implement classes Businessman and Student
// * They both should implement Person
// * They both can buy alcohol only if over 21
// * Businessman says hello by “Good morning”, Student by “Hi”.
// * Businessman cheers by “Hello, my name is {his name}, nice to see you {cheered person name}”, Student by “Hey {cheered person name}, I am {his name}”.

fun main() {
    val businessman: Person = TODO("Use Businessman constructor here once it is implemented")
    val student: Person = TODO("Use Businessman constructor here once it is implemented")

    println(businessman.helloText())
    println(student.helloText())

    println(businessman.cheerText(student))
    println(student.cheerText(businessman))

    fun sayIfCanBuyAlcohol(person: Person) {
        val modal = if(person.canBuyAlcohol) "can" else "can't"
        println("\${person.name} $modal buy alcohol")
    }

    sayIfCanBuyAlcohol(businessman)
    sayIfCanBuyAlcohol(student)
}`]

export default function ChallengesExamplePage() {
    registerPage("challenges")
    const t = useTranslations();

    const puzzlerBanner = {
        img: ChallengeHeaderBg,
        width: Width.Half,
        title: t.challenge.title,
        subtitle: t.challenge.subtitle,
    };
    return <>
        <Header banner={puzzlerBanner}/>
        <section className="challenge short-section">
            <div className="content-container">
                <h1>{t.challenge.whatAreChallenges}</h1>
                <p>{t.challenge.description}</p>
                <h1 className="margin-top-30">{t.challenge.examplesTitle}</h1>
                <div className="content-rectangle content-rectangle--white margin-top-30">
                    {challenges.map((challenge, i) =>
                        <KotlinPlayground key={i} mode="kotlin" className="text-align-left margin-bottom-50">
                            {challenge}
                        </KotlinPlayground>
                    )}
                </div>
            </div>
        </section>
        <TestimonialsSection/>
        <FooterSection/>
    </>;
};