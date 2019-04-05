import {
  api
} from "./backend";


export const renderPoints = (tripsArr) => {
  const tripDayItems = document.querySelector(`.trip-day__items`);
  tripDayItems.innerHTML = ``;
  tripsArr.forEach((pointsItem) => {

    if (pointsItem && pointsItem.point) {
      pointsItem.point.editHandler = () => {
        pointsItem.pointEdit.render();
        tripDayItems.replaceChild(pointsItem.pointEdit.element, pointsItem.point.element);
      };

      pointsItem.pointEdit.submitHandler = () => {
        api.updatePoint({id: pointsItem.pointEdit._id, data: pointsItem.pointEdit.toRAW()}).then((entry) => {
          pointsItem.point.update(entry);
          pointsItem.pointEdit.update(entry);
          pointsItem.point.render();

          tripDayItems.replaceChild(pointsItem.point.element, pointsItem.pointEdit.element);
        });
        // const formData = new FormData(pointsItem.pointEdit._element.querySelector(`form`));
        // const entry = generateEntry(formData);
        // entry.time = generateDate(formData);

        // pointsItem.point.update(entry);
        // pointsItem.pointEdit.update(entry);


      };

      tripDayItems.appendChild(pointsItem.point.render());
    }
  });
};

const generateEntry = (formData) => {
  return {
    destination: formData.get(`destination`),
    price: formData.get(`price`),
    type: formData.get(`travel-way`)
  };
};

const generateDate = (formData) => {
  const day = formData.get(`day`);

  // Устанавливаем в start текущую дату
  let start = new Date();

  // Проверяем, есть ли значение в поле выбора даты
  if (day) {

    // Если значение есть устанавливаем в start его
    start = new Date(day);
  }

  // Приравниваем end к start (предположим, что событие началось и закончилось в один день)
  const end = new Date(start);

  // Устанавливаем время
  const startTime = parseTimeValue(formData.get(`first-time`));
  const endTime = parseTimeValue(formData.get(`second-time`));

  start.setHours(startTime.hours, startTime.minutes);
  end.setHours(endTime.hours, endTime.minutes);

  // Проверяем не получилось ли окончание события раньше начала. Такое может быть, если время события пересекает полночь например 23:00 - 01:00, и если это произошло, то добавляем в end 1 день.
  if (end.getTime() < start.getTime()) {
    end.setDate(end.getDate() + 1);
  }

  return {
    start,
    end
  };
};

const parseTimeValue = (value) => {
  const valueArr = value.split(`:`).map((timeString) => {
    return parseInt(timeString, 10);
  });
  const [hours, minutes] = valueArr;

  return {
    hours,
    minutes
  };
};
