const PortalStage = ({ duplicateMesh, ...props }) => {
  const myMap = useTexture(texture)
  const portalMaterial = useRef()
  useFrame((_state, delta) => {
    const worldOpen = active === name
    easing.damp(portalMaterial.current, "blend", worldOpen ? 1 : 0, 0.25, delta)
  })
  return <group {...props}>{children}</group>
}
