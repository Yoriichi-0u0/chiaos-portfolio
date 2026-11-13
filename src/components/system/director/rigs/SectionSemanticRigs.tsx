import type { SystemSectionKey } from "@/types/portfolio";
import { ChiaOSCoreProcessor, EducationArchiveNode, OperationsSignalNetwork } from "./identityRigs";
import { AssistantCore, CareerTrack, FutureRoute, MemoryVault, SignalBeacon } from "./journeyRigs";
import { LifeOSCapsules, MissionModuleCluster, SkillConstellationFrame } from "./workRigs";

export function SectionSemanticRigs({
  activeSection,
  highlightedMissionId,
  reduceMotion,
  mobile,
}: {
  activeSection: SystemSectionKey;
  highlightedMissionId: string | null;
  reduceMotion: boolean;
  mobile: boolean;
}) {
  return (
    <>
      <ChiaOSCoreProcessor
        active={activeSection === "hero" || activeSection === "identity"}
        reduceMotion={reduceMotion}
        mobile={mobile}
      />
      <EducationArchiveNode
        active={activeSection === "education"}
        reduceMotion={reduceMotion}
        mobile={mobile}
      />
      <OperationsSignalNetwork
        active={activeSection === "operations"}
        reduceMotion={reduceMotion}
        mobile={mobile}
      />
      <MissionModuleCluster
        active={activeSection === "missions"}
        reduceMotion={reduceMotion}
        mobile={mobile}
        highlightedMissionId={highlightedMissionId}
      />
      <SkillConstellationFrame
        active={activeSection === "skills"}
        reduceMotion={reduceMotion}
        mobile={mobile}
      />
      <LifeOSCapsules
        active={activeSection === "life-os"}
        reduceMotion={reduceMotion}
        mobile={mobile}
      />
      <CareerTrack
        active={activeSection === "timeline"}
        reduceMotion={reduceMotion}
        mobile={mobile}
      />
      <MemoryVault
        active={activeSection === "build-logs"}
        reduceMotion={reduceMotion}
        mobile={mobile}
      />
      <FutureRoute
        active={activeSection === "roadmap"}
        reduceMotion={reduceMotion}
        mobile={mobile}
      />
      <AssistantCore
        active={activeSection === "ask"}
        reduceMotion={reduceMotion}
        mobile={mobile}
      />
      <SignalBeacon
        active={activeSection === "contact"}
        reduceMotion={reduceMotion}
        mobile={mobile}
      />
    </>
  );
}
