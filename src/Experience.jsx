import { useFrame } from '@react-three/fiber'
import { meshBounds, OrbitControls, useGLTF } from '@react-three/drei'
import { useRef } from 'react'

/**
 * General pointer events notes
 * - avoid events that need testing on each frame
 *      e.g. move, over, enter, out, leave
 *      these are taxing on cpu
 * - minimize num of obj that listen to events
 * - avoid testing complex geometries
 * - any freeze or jumps in animation is good indication that perf needs work
 * - meshBounds: good resource to testing complex geos
 *      it creates simple testing geo around object with far less polygons to test
 *      drawback - much less precise, pointer events might not be exact to object, only works on single meshes
 */

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

    const { scene } = useGLTF('./hamburger.glb')

    return <>

        <OrbitControls makeDefault />

        <directionalLight position={ [ 1, 2, 3 ] } intensity={ 1.5 } />
        <ambientLight intensity={ 0.5 } />

        <mesh
            position-x={ - 2 }
            onClick={(e) => e.stopPropagation()} // this is useful to prevent the onClick of the cube form happening, e.g. if sphere infront of cube and don't want cube click event to fire in this case
            onPointerEnter={(e) => e.stopPropagation()}
            onPointerLeave={(e) => e.stopPropagation()}
        >
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
        </mesh>

        <mesh
            ref={ cube }
            raycast={ meshBounds }
            position-x={ 2 }
            scale={ 1.5 }
            onClick={ handleClick }
            onPointerEnter={() => document.body.style.cursor = 'pointer'}
            onPointerLeave={() => document.body.style.cursor = 'default'}
        >
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
        </mesh>

        <mesh position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh>

        <primitive object={ scene } scale={ .35 } position-y={ 1.5 } 
            onClick={(e) => {
                console.log('helooo', e.object.name)
                e.stopPropagation()
            }}
        />

    </>
}