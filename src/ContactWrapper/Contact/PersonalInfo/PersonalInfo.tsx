import dayjs from "dayjs";
import { Character } from "../../../types";

type Props = {
  character: Character;
};

const PersonalInfo = ({ character }: Props) => {
  if (character) {
    return (
      <div>
        <span className="block text-lg lg:text-3xl mb-4">Personal Info</span>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <span className="block text-gray-400 text-xs lg:text-lg">
              Status:
            </span>
            <span className="text-sm lg:text-xl">{character.status}</span>
          </div>
          <div>
            <span className="block text-gray-400 text-xs lg:text-lg">
              Gender:
            </span>
            <span className="text-sm lg:text-xl">{character.gender}</span>
          </div>
          <div>
            <span className="block text-gray-400 text-xs lg:text-lg">
              Species:
            </span>
            <span className="text-sm lg:text-xl">{character.species}</span>
          </div>
          <div>
            <span className="block text-gray-400 text-xs lg:text-lg">
              Location:
            </span>
            <span className="text-sm lg:text-xl">
              {character.location.name}
            </span>
          </div>
          <div>
            <span className="block text-gray-400 text-xs lg:text-lg">
              Origin:
            </span>
            <span className="text-sm lg:text-xl">{character.origin.name}</span>
          </div>
          <div>
            <span className="block text-gray-400 text-xs lg:text-lg">
              Created Date:
            </span>
            <span className="text-sm lg:text-xl">
              {dayjs(character.created).format("DD MMM YYYY")}
            </span>
          </div>
        </div>
      </div>
    );
  }
};

export default PersonalInfo;
