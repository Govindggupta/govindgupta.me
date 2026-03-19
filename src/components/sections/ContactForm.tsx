"use client"

import { useState } from "react"

import { SocialLinks } from "@/components/ui/SocialLinks"

interface FormValues {
  name: string
  email: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

const initialValues: FormValues = {
  name: "",
  email: "",
  message: "",
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(values: FormValues) {
  const errors: FormErrors = {}

  if (!values.name.trim()) {
    errors.name = "Name is required."
  }

  if (!values.email.trim()) {
    errors.email = "Email is required."
  } else if (!emailPattern.test(values.email)) {
    errors.email = "Enter a valid email address."
  }

  if (!values.message.trim()) {
    errors.message = "Message is required."
  } else if (values.message.trim().length < 20) {
    errors.message = "Message should be at least 20 characters."
  }

  return errors
}

export function ContactForm() {
  const [values, setValues] = useState<FormValues>(initialValues)
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target

    setValues((current) => ({
      ...current,
      [name]: value,
    }))

    setErrors((current) => ({
      ...current,
      [name]: undefined,
    }))
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const nextErrors = validate(values)
    setErrors(nextErrors)
    setSubmitted(false)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    setValues(initialValues)
    setSubmitted(true)
  }

  return (
    <div className="space-y-10">
      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm text-foreground-soft">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={values.name}
            onChange={handleChange}
            aria-invalid={Boolean(errors.name)}
            className="w-full border border-border bg-background px-4 py-3 text-foreground transition-colors duration-300 outline-none focus:border-foreground"
          />
          {errors.name ? (
            <p className="text-sm text-muted">{errors.name}</p>
          ) : null}
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm text-foreground-soft">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            aria-invalid={Boolean(errors.email)}
            className="w-full border border-border bg-background px-4 py-3 text-foreground transition-colors duration-300 outline-none focus:border-foreground"
          />
          {errors.email ? (
            <p className="text-sm text-muted">{errors.email}</p>
          ) : null}
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="text-sm text-foreground-soft">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            value={values.message}
            onChange={handleChange}
            aria-invalid={Boolean(errors.message)}
            className="w-full resize-none border border-border bg-background px-4 py-3 text-foreground transition-colors duration-300 outline-none focus:border-foreground"
          />
          {errors.message ? (
            <p className="text-sm text-muted">{errors.message}</p>
          ) : null}
        </div>

        <button
          type="submit"
          className="inline-flex items-center justify-center border border-foreground bg-foreground px-5 py-3 text-sm font-medium text-background transition-colors duration-300 hover:opacity-60"
        >
          Send
        </button>

        <p aria-live="polite" className="text-sm text-muted">
          {submitted ? "Thanks. Your message has been validated locally." : ""}
        </p>
      </form>

      <div className="border-t border-border pt-6">
        <SocialLinks />
      </div>
    </div>
  )
}
