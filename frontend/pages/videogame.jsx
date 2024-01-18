import React, { useState, useEffect } from 'react';
import HomeLayout from "@/components/HomeLayout";
import Unity, { UnityContext } from "react-unity-webgl";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from 'next/router';
import { Flex } from '@chakra-ui/react';
import CourseCard from '@/components/CourseCard';

const unityContext = new UnityContext({
    loaderUrl: "Build/El_Fraccionista_WEB_ver.loader.js",
    dataUrl: "Build/El_Fraccionista_WEB_ver.data",
    frameworkUrl: "Build/El_Fraccionista_WEB_ver.framework.js",
    codeUrl: "Build/El_Fraccionista_WEB_ver.wasm",
});

export default function GamePage() {
    const router = useRouter();
    const { isAuthenticated, user } = useAuth();
    const [isUnityLoaded, setUnityLoaded] = useState(false);
    const [isUnityVisible, setUnityVisible] = useState(false);
    const [isButtonVisible, setButtonVisible] = useState(true);
    const [cursoId, setCursoId] = useState(null);
    const esAdminOProfesor = user && (user.role === 'ADMIN' || user.role === 'PROFESOR');

    // Agregado para rastrear la carga de Unity
    useEffect(() => {
        unityContext.on("loaded", () => {
            setUnityLoaded(true);
        });
    }, []);

    useEffect(() => {
        // Obtener el cursoId de la URL
        if (router.query.cursoId) {
            setCursoId(router.query.cursoId);
        }
    }, [router.query.cursoId]);

    const handleRedirectToStats = () => {
        if (cursoId) {
            router.push(`/statsusuarios?cursoId=${cursoId}`);
        }
    };

    const userName = isAuthenticated && user ? user.nombre : "";
    const userId = isAuthenticated && user ? user.id : "";

    const userIdAndName = `${userId}, ${userName}`;
    console.log(userIdAndName);

    function SendName() {
        if (isUnityLoaded) {
            unityContext.send("ConnectToServer", "SetString", userIdAndName);
            setUnityVisible(true); // Mostrar el componente Unity cuando se envía el nombre
            setButtonVisible(false);
        } else {
            // Intenta enviar los datos después de un breve retraso si Unity aún no está cargado.
            setTimeout(() => {
                if (isUnityLoaded) {
                    unityContext.send("ConnectToServer", "SetString", userIdAndName);
                    setUnityVisible(true);
                    setButtonVisible(false);
                }
            }, 1000); // Ajusta el tiempo según sea necesario.
        }
    }
    //Tarjetas para la portada del curso
    const cardsData = [
        {
            title: 'Módulo de Evaluación',
            description: 'Permite medir y evaluar el conocimiento adquirido de los estudiantes.',
            buttonText: 'Ingresar',
            showSendNameButton: false,
        },
        {
            title: '"El Fraccionista"',
            description: 'Videojuego educativo diseñado para enseñar conceptos de fracciones de manera interactiva.',
            buttonText: 'Ingresar',
            showSendNameButton: true,
        }
    ];

    if (esAdminOProfesor) {
        cardsData.unshift({
            title: 'Estadísticas de Estudiantes',
            description: 'Este apartado proporciona información sobre el rendimiento de los estudiantes después de cada partida jugada.',
            buttonText: 'Ingresar',
            showSendNameButton: false,
        });
    }

    return (
        <HomeLayout>
            <Flex justify="center">
                <Unity style={{ width: 1400, height: 800, display: isUnityVisible ? "block" : "none" }} unityContext={unityContext} />
            </Flex>
            {isButtonVisible && (
                <Flex justify="center">
                    {cardsData.map((card, index) => (
                        <CourseCard
                            key={index}
                            title={card.title}
                            description={card.description}
                            buttonText={card.buttonText}
                            onClick={() => card.title === 'Estadísticas de Estudiantes' ? handleRedirectToStats() : undefined}
                            sendName={card.showSendNameButton ? SendName : undefined}
                        />
                    ))}
                </Flex>
            )}
        </HomeLayout>
    );
}
