import Scene from './Scene';
import Org from './Org';
import OrgPart from './OrgPart';
import OrgMap from './OrgMap';
import OrgPartType from './OrgPartType';
import PlanFireElement from './PlanFireElement';
import PlanFireElementType from './PlanFireElementType';
import PlanDisasterGrade from './PlanDisasterGrade';
import CombatPower from './CombatPower';
import RpUnits from './rpUnits';
import Warnings from './Warnings';
import Circles from './Circles';
import OrgCommands from './OrgCommands';
import PlanDisaster from './PlanDisaster';
import PlanBasicInfo from './PlanBasicInfo';
import EmergencyForceMobilize from './EmergencyForceMobilize';
import IOV from "./IOV";
import PlanManagement from './PlanManagement';

/**
 * hy服务层入口
 * @author xiecan
 * @desc 2020-5-30 09:05:25
 */
class Services{
  constructor(root){
    this.scene = new Scene(root);
    this.org = new Org(root);
    this.orgPart = new OrgPart(root);
    this.orgMap = new OrgMap(root);
    this.orgPartType = new OrgPartType(root);
    this.orgCommands = new OrgCommands(root);
    this.planFireElement = new PlanFireElement(root);
    this.planFireElementType = new PlanFireElementType(root);
    this.planDisaster = new PlanDisaster(root);
    this.planDisasterGrade = new PlanDisasterGrade(root);
    this.planBasicInfo = new PlanBasicInfo(root);
    this.combatPower = new CombatPower(root);
    this.rpUnits = new RpUnits(root);
    this.warnings = new Warnings(root);
    this.circles = new Circles(root);
    this.emergencyForceMobilize = new EmergencyForceMobilize(root);
    this.iov = new IOV(root);
    this.planManagement = new PlanManagement(root);
  }
}

export default Services;