import { MouseSniffer } from "./MouseSniffer"
import { KeyboardSniffer } from "./KeyboardSniffer"
import {NerdStatsManager} from "./NerdStatsManager";
import {STORAGE_KEYS} from "../../storage/chrome-storage";
import { AssessmentManager } from "./AssessmentManager"


const init = async () : Promise<void> => {

    const subject_id = (await chrome.storage.local.get([STORAGE_KEYS.SUBJECT_ID]))[STORAGE_KEYS.SUBJECT_ID]

    //let mouse_sniffer : MouseSniffer = new MouseSniffer(subject_id)
    //mouse_sniffer.init()

    //let keyboard_sniffer : KeyboardSniffer = new KeyboardSniffer(subject_id)
    //keyboard_sniffer.init()

    //const assessment_supervisor : AssessmentManager = new AssessmentManager(subject_id)
    //await assessment_supervisor.init()

    const nerd_stats_manager = new NerdStatsManager()
    await nerd_stats_manager.init()
}



init()









/*
function listAllEventListeners() {
    const allElements = Array.prototype.slice.call(document.querySelectorAll('*'));
    allElements.push(document);
    allElements.push(window);

    const types = [];

    for (let ev in window) {
      if (/^on/.test(ev)) types[types.length] = ev;
    }

    let elements = [];
    for (let i = 0; i < allElements.length; i++) {
      const currentElement = allElements[i];
      for (let j = 0; j < types.length; j++) {
        if (typeof currentElement[types[j]] === 'function') {
          elements.push({
            "node": currentElement,
            "type": types[j],
            "func": currentElement[types[j]].toString(),
          });
        }
      }
    }

    return elements.sort(function(a,b) {
      return a.type.localeCompare(b.type);
    });
  }
 */

