import CreateRoom from "@/components/room/CreateRoom";
import JoinRoom from "@/components/room/JoinRoom";
import Image from "next/image";

export default function Home() {
  return (
    <main className="w-full flex flex-col gap-4 md:gap-36 mx-auto px-4 md:px-20 py-8 relative">
      <div className="flex justify-center items-center flex-col md:flex-row gap-4 md:gap-14 mt-14 md:mt-6">
        <div
          id="main-banner"
          className="w-full md:w-3/5 flex flex-col text-slate-50 md:pl-10 pb-10 md:pb-0"
        >
          <h1 className="w-full font-bold text-xl md:text-3xl text-center">
            Conéctate y fortalece tu equipo: <br />
            Tarjetas de conversación para Team Building
          </h1>
          <p className="text-center">
            Nuestra herramienta única fortalece la cohesión del equipo al crear
            un ambiente de confianza donde se fomenta la comunicación y la
            conexión, permitiendo que todos compartan sus experiencias y
            pensamientos.
          </p>
          <CreateRoom />
          <JoinRoom />
        </div>
      </div>
      <div className="w-full h-full flex flex-col md:flex-row gap-4 justify-center content-center text-sky-50 mt-0 md:mt-6">
        <div className="w-full md:w-2/6 flex flex-col gap-2 rounded-lg bg-sky-950 p-8 border border-sky-900">
          <svg
            className="text-sky-50 fill-current w-14 h-14"
            viewBox="0 0 24 24"
          >
            <path d="m21.47 4.35-1.34-.56v9.03l2.43-5.86c.41-1.02-.06-2.19-1.09-2.61m-19.5 3.7L6.93 20a2.01 2.01 0 0 0 1.81 1.26c.26 0 .53-.05.79-.16l7.37-3.05c.75-.31 1.21-1.05 1.23-1.79.01-.26-.04-.55-.13-.81L13 3.5a1.95 1.95 0 0 0-1.81-1.25c-.26 0-.52.06-.77.15L3.06 5.45a1.994 1.994 0 0 0-1.09 2.6m16.15-3.8a2 2 0 0 0-2-2h-1.45l3.45 8.34" />
          </svg>
          <h3 className="font-bold text-lg">Conversaciones significativas</h3>
          <p className="text-sm md:text-md">
            Desbloquea conversaciones profundas y significativas con nuestras
            tarjetas de team building. Desde reflexiones hasta preguntas
            estimulantes, nuestra herramienta te ayudará a construir conexiones
            más fuertes dentro de tu equipo.
          </p>
        </div>
        <div className="w-full md:w-2/6 flex flex-col gap-2 rounded-lg bg-sky-950 p-8 border border-sky-900">
          <svg
            className="text-sky-50 fill-current w-14 h-14"
            viewBox="0 0 24 24"
          >
            <path d="M22 17.002a6.002 6.002 0 0 1-4.713 5.86l-.638-1.914A4.003 4.003 0 0 0 19.465 19H17a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h2.938a8.001 8.001 0 0 0-15.876 0H7a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-5C2 6.477 6.477 2 12 2s10 4.477 10 10v5z" />
          </svg>
          <h3 className="font-bold text-lg">Habla y comparte</h3>
          <p className="text-sm md:text-md">
            Habla y comparte tus respuestas con tu equipo usando tu aplicación
            de voz favorita. Rompe las barreras de la comunicación y fomenta la
            colaboración de una manera fácil y conveniente.
          </p>
        </div>
        <div className="w-full md:w-2/6 flex flex-col gap-2 rounded-lg bg-sky-950 p-8 border border-sky-900">
          <svg
            className="text-sky-50 fill-current w-14 h-14"
            viewBox="0 0 24 24"
          >
            <path d="M2 6c0-1.505.78-3.08 2-4 0 .845.69 2 2 2a3 3 0 0 1 3 3c0 .386-.079.752-.212 1.091a74.515 74.515 0 0 1 2.191 1.808l-2.08 2.08a75.852 75.852 0 0 1-1.808-2.191A2.977 2.977 0 0 1 6 10c-2.21 0-4-1.79-4-4m12.152 6.848 1.341-1.341A4.446 4.446 0 0 0 17.5 12 4.5 4.5 0 0 0 22 7.5c0-.725-.188-1.401-.493-2.007L18 9l-2-2 3.507-3.507A4.446 4.446 0 0 0 17.5 3 4.5 4.5 0 0 0 13 7.5c0 .725.188 1.401.493 2.007L3 20l2 2 6.848-6.848a68.562 68.562 0 0 0 5.977 5.449l1.425 1.149 1.5-1.5-1.149-1.425a68.562 68.562 0 0 0-5.449-5.977" />
          </svg>
          <h3 className="font-bold text-lg">Personaliza tu experiencia</h3>
          <p className="text-sm md:text-md">
            Personaliza tu experiencia de team building con nuestra amplia gama
            de tarjetas y categorías. Desde actividades divertidas hasta
            reflexiones serias, hay algo para cada equipo. ¡Haz que cada sesión
            sea única y memorable!
          </p>
        </div>
      </div>
    </main>
  );
}
