import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import { AttentionGuide } from "./AttentionGuide";
import { PerfProbe } from "../PerfProbe";
import { DirectorCore } from "./DirectorCore";
import { DirectorModule } from "./DirectorModule";
import { formations, nodes } from "./formations";
import { missionNodeMap, nodeForSkill, sectionNodeFocus } from "./mapping";
import { SectionSemanticRigs } from "./rigs/SectionSemanticRigs";
import type { SystemDirectorProps } from "./types";

export function DirectorScene({
  activeSection,
  highlightedMissionId,
  highlightedSkill,
  reduceMotion,
  mobile,
}: Required<SystemDirectorProps> & {
  reduceMotion: boolean;
  mobile: boolean;
}) {
  const invalidate = useThree((state) => state.invalidate);

  useEffect(() => {
    invalidate();
  }, [invalidate, activeSection, highlightedMissionId, highlightedSkill, mobile, reduceMotion]);

  const formation = formations[activeSection];
  const activeNode = sectionNodeFocus[activeSection];
  const missionNode = highlightedMissionId ? missionNodeMap[highlightedMissionId] : null;
  const skillNode = nodeForSkill(highlightedSkill);
  const highlightedNode = missionNode ?? skillNode;
  const showConnections = formation.connect && !mobile;
  const showPulse = activeSection === "ask" || Boolean(highlightedMissionId || highlightedSkill);
  const guidePulse =
    showPulse ||
    activeSection === "hero" ||
    activeSection === "missions" ||
    activeSection === "skills" ||
    activeSection === "operations";
  const sceneScale = mobile ? 0.72 : 0.98;
  const scenePosition: [number, number, number] = mobile ? [1.02, 0.76, 0] : [1.18, 0.02, 0];

  return (
    <>
      <PerfProbe name="director" />
      <ambientLight intensity={1.05} />
      <directionalLight position={[2.8, 4.5, 5]} intensity={mobile ? 1.8 : 2.35} />
      <pointLight position={[2.7, 0.5, 3]} color="#00D9FF" intensity={mobile ? 9 : 16} distance={10} />
      <pointLight position={[-2.6, -1, 2.4]} color="#FFD400" intensity={mobile ? 5 : 8.5} distance={9} />
      <pointLight position={[0.2, 1.8, 2.7]} color="#B7F7FF" intensity={mobile ? 3.5 : 5.5} distance={8} />

      <group position={scenePosition} scale={sceneScale}>
        <DirectorCore
          formation={formation}
          reduceMotion={reduceMotion}
          mobile={mobile}
          pulse={showPulse}
        />
        <AttentionGuide
          formation={formation}
          reduceMotion={reduceMotion}
          mobile={mobile}
          pulse={guidePulse}
        />
        <SectionSemanticRigs
          activeSection={activeSection}
          highlightedMissionId={highlightedMissionId}
          reduceMotion={reduceMotion}
          mobile={mobile}
        />

        {!mobile ? (
          <>
            <Line
              points={formation.path}
              color={activeSection === "roadmap" || activeSection === "timeline" ? "#FFD400" : "#00D9FF"}
              lineWidth={3}
              transparent
              opacity={0.62}
            />
            <Line
              points={formation.path.map(([x, y, z]) => [x, y - 0.12, z - 0.22] as [number, number, number])}
              color="#B7F7FF"
              lineWidth={1.5}
              transparent
              opacity={0.3}
            />
          </>
        ) : (
          <Line
            points={formation.path}
            color={formation.accent}
            lineWidth={2.2}
            transparent
            opacity={0.42}
          />
        )}

        {showConnections
          ? nodes.map((node) => (
              <Line
                key={`${node.key}-connection`}
                points={[formation.core, formation.nodes[node.key]]}
                color={node.key === highlightedNode ? "#FFD400" : "#00D9FF"}
                lineWidth={node.key === highlightedNode ? 3.5 : 2}
                transparent
                opacity={node.key === highlightedNode ? 0.8 : 0.36}
              />
            ))
          : null}

        {nodes.map((node) => (
          <DirectorModule
            key={node.key}
            node={node}
            target={formation.nodes[node.key]}
            active={node.key === activeNode}
            highlighted={node.key === highlightedNode}
            reduceMotion={reduceMotion}
            mobile={mobile}
            quiet={activeSection !== "missions" && activeSection !== "skills" && activeSection !== "operations"}
          />
        ))}
      </group>
    </>
  );
}
