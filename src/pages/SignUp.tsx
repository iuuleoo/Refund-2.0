import { useState } from "react";
import { z, ZodError } from "zod";

import { Input } from "../components/Input";
import { Button } from "../components/Button";

const SignUpSchema = z.object({
  name: z.string().trim().min(1, { message: "Informe o nome"}),
  email: z.string().email({ message: "E-mail inválido" }),
  password: z.string().min(6, { message: "Senha deverá ter no mínimo 6 caracteres" }),
  passwordConfirm: z.string({ message: "confirme a senha"}),
}).refine(( data ) => data.password === data.passwordConfirm, {
  message: "As senhas são iguais",
  path: ["passwordConfirm"],
})

export function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setIsLoading(true)

      const data = SignUpSchema.parse({
        name,
        email,
        password,
        passwordConfirm,
      })

    } catch (error) {
      if(error instanceof ZodError) {
        return alert(error.issues[0].message);
    }

    alert("Erro ao cadastrar usuário");
    } finally {
      setIsLoading(false);
    }

  }

  return (
    <form onSubmit={onSubmit} className="w-full flex flex-col gap-4">
      <Input
        required
        legend="Name"
        placeholder="Seu nome"
        onChange={(e) => setName(e.target.value)}
      />

      <Input
        required
        legend="E-mail"
        type="email"
        placeholder="seu@email.com"
        onChange={(e) => setEmail(e.target.value)}
      />

      <Input
        required
        legend="Senha"
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <Input
        required
        legend="Confirmação da Senha"
        type="password"
        placeholder="password"
        onChange={(e) => setPasswordConfirm(e.target.value)}
      />

      <Button type="submit" isLoading={isLoading}>
        Cadastrar
      </Button>

      <a
        href="/"
        className="text-sm font-semibold text-gray-100 mt-10 mb-4 text-center hover:text-green-800 transition ease-linear"
      >
        Já tenho uma conta
      </a>
    </form>
  );
}
