import { useEffect } from "react";
import { gsap } from "gsap";

export default function useGsapHeroAnimation(heroRef, imgRef, nameRef, roleRef, loading) {
	useEffect(() => {
		if (!loading) {
			const tl = gsap.timeline();
			tl
				.from(heroRef.current, {
					opacity: 0,
					scale: 0.95,
					duration: 0.6,
					ease: "power2.out",
				})
				.from(nameRef.current, {
					y: 40,
					opacity: 0,
					duration: 0.5,
				}, "-=0.3")
				.from(imgRef.current, {
					scale: 0.7,
					opacity: 0,
					duration: 0.5,
				}, "-=0.3")
				.from(roleRef.current, {
					y: 30,
					opacity: 0,
					duration: 0.5,
				}, "-=0.3");
		}
	}, [loading, heroRef, imgRef, nameRef, roleRef]);
}
