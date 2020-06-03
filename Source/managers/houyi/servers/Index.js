import Scene from './Scene';
import OrgPart from './OrgPart';
import OrgPartType from './OrgPartType';
import PlanFireElement from './PlanFireElement';
import PlanFireElementType from './PlanFireElementType';
import PlanDisasterGrade from './PlanDisasterGrade';
import RpUnits from './rpUnits';
import Warnings from './Warnings';
import Circles from './Circles';
import OrgCommands from './OrgCommands';
import PlanBasicInfo from './PlanBasicInfo';
import EmergencyForceMobilize from './EmergencyForceMobilize';


/**
 * hy服务层入口
 * @author xiecan
 * @desc 2020-5-30 09:05:25
 */
class Servers{
  constructor(root){
    this.scene = new Scene(root);
    this.orgPart = new OrgPart(root);
    this.orgPartType = new OrgPartType(root);
    this.orgCommands = new OrgCommands(root);
    this.planFireElement = new PlanFireElement(root);
    this.planFireElementType = new PlanFireElementType(root);
    this.planDisasterGrade = new PlanDisasterGrade(root);
    this.planBasicInfo = new PlanBasicInfo(root);
    this.rpUnits = new RpUnits(root);
    this.warnings = new Warnings(root);
    this.circles = new Circles(root);
    this.emergencyForceMobilize = new EmergencyForceMobilize(root);
  }
}

export default Servers;