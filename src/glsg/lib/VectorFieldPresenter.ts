import { SceneElementPresenter } from './SceneElementPresenter';
import { VectorField } from './VectorField';
import Logger from './Logger';
import { SceneElementData } from './SceneElementData';

enum VectorFieldCellEntryType
{
    OrderBook,
    TradeHistory,
    UserOrder,
    UserExecution
}

export class VectorFieldCellEntry
{
    constructor(public type : VectorFieldCellEntryType, value:number, scalingFactor : number)
    {
        Logger.log('value: ' + value + ', scalingFactor: ' + scalingFactor);
    }
}

export class VectorFieldCell
{
    entries : Map<VectorFieldCellEntryType, Array<VectorFieldCellEntry>>
        = new Map<VectorFieldCellEntryType, Array<VectorFieldCellEntry>>();

    constructor(public row : number, public column: number)
    {

    }
}

export class VectorFieldData extends SceneElementData
{
    cells: VectorFieldCell[][];

    constructor(rowCount : number, columnCount : number)
    {
        super();

        this.cells = new Array<Array<VectorFieldCell>>();
        for (let y = 0; y <= rowCount; y++) {
          let row:VectorFieldCell[]  = new Array<VectorFieldCell>();      
          for (let x = 0; x <=columnCount; x++){
            row.push(new VectorFieldCell(y, x));
          }
          this.cells.push(row);
        }
    }   
}

export class VectorFieldPresenter extends SceneElementPresenter<VectorFieldData>
{
    data : VectorFieldData;

    constructor(public element: VectorField, rowCount : number, columnCount : number)
    {
        super();
        this.data = new VectorFieldData(rowCount,columnCount); 
    }
}
