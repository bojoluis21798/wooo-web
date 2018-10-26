import dog from '../images/dog.jpeg'
import dog2 from '../images/dog2.jpg'
import dog3 from '../images/dog3.jpg'

export default {
    data: [{
            name: "Rico",
            age: 16,
            img: [dog, dog2, dog3],
            location: "DOWNTOWN MANHATTAN, NEW YORK",
            bio: "My friends call me daddy. I can't figure out why. Do you mind helping me figure it out?",
        },
        {
            name: "Rob",
            age: 17,
            img: [dog2, dog, dog3],
            location: "DOWNTOWN MANHATTAN, NEW YORK",
            bio: "Im chinese",
        },
        {
            name: "Joe",
            age: 17,
            img: [dog3, dog, dog2],
            location: "DOWNTOWN MANHATTAN, NEW YORK",
            bio: "Im white",
        }
    ]
}
