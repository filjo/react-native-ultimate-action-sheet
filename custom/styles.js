
import glamorous from 'glamorous-native'

const blue = '#335DC6'
const lightBlue = '#12c8fd'
const ITEM_HEIGHT = 60

export const ActionSheetTitleView = glamorous.text({
    color: 'gray',
    fontSize: 14,
    textAlign: 'left',
    backgroundColor: 'purple'
})

export const ActionSheetItemContainer = glamorous.view({
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingLeft: 20
})

export const ActionSheetItemImageContainer = glamorous.view({
    alignItems: 'center',
    justifyContent: 'center',
})

export const ActionSheetItemImageView = glamorous.image(
    {
        resizeMode: 'cover',
        height: 24,
        width: 24,
        tintColor: 'black'
    }
)

export const ActionSheetItemSubContainer = glamorous.view(
    {
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        marginLeft: 20,
        flex: 1,
        borderBottomWidth: 1,
        paddingVertical: 10
    },
    props => ({
        borderBottomColor: props.withBorder ? '#ECF0F1' : 'white'
    })
)

export const ActionSheetItemTitleView = glamorous.text(
    {
        fontSize: 13,
        textAlign: 'left',
        color: blue,
    }
)

export const ActionSheetDescriptionView = glamorous.text(
    {
        fontSize: 10,
        textAlign: 'left',
        color: lightBlue,
        marginTop: 5
    }
)

export const ActionSheetItemBottomBorderView = glamorous.view({
    flexWrap: 'wrap',
    height: 1,
    backgroundColor: '#ECF0F1',
    bottom: 0
})
