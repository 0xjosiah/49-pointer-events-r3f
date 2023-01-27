import { useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useRef } from 'react'

export default function Experience()
{
    const cube = useRef()
    
    useFrame((state, delta) =>
    {
        cube.current.rotation.y += delta * 0.2
    })

    const handleClick = () => {
        // two diff ways to get random colo
        // cube.current.material.color = { r: Math.random(), g: Math.random(), b: Math.random() } // mine
        cube.current.material.color.set(`hsl(${Math.random() * 360}, 100%, 75%)`) // lesson
    }

    return <>

        <OrbitControls makeDefault />

        <directionalLight position={ [ 1, 2, 3 ] } intensity={ 1.5 } />
        <ambientLight intensity={ 0.5 } />

        <mesh
            position-x={ - 2 }
            onClick={(e) => e.stopPropagation()} // this is useful to prevent the onClick of the cube form happening, e.g. if sphere infront of cube and don't want cube click event to fire in this case
        >
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
        </mesh>

        <mesh
            ref={ cube }
            position-x={ 2 }
            scale={ 1.5 }
            onClick={ handleClick }
            onPointerEnter={(e) => }
        >
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
        </mesh>

        <mesh position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh>

    </>
}